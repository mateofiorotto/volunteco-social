<script>
import MainLoader from '../components/MainLoader.vue';
import { subscribeToAuthStateChanges } from '../services/auth';
import { getLastChatMessages, sendChatMessage, subscribeToChatNewMessages } from '../services/global-chat';
import { getUserProfileByPK } from '../services/user-profile';
import { useDateFormat } from '@vueuse/core';

let unsubscribeAuth = () => { };
let unsubscribeChat = () => { };

export default {
    name: 'GlobalChat',
    components: { MainLoader },
    data() {
        return {
            loading: true,
            messages: [],
            message: '',
            user: {
                id: null,
                full_name: null
            }
        }
    },
    methods: {
        async sendMessage() {
            //console.log(this.user.id);
            try {
                await sendChatMessage(this.message, this.user.id);

                this.message = '';

            } catch (error) {
                console.error("[GlobalChat.vue sendMessage] Error al enviar el mensaje: ", error);

                throw new Error("Ocurrio un error al enviar el mensaje: " + error.message);
            }
        },
        formatDate(created_at) {
            const date = new Date(created_at)
            const now = new Date()

            const isSameDay =
                date.getFullYear() === now.getFullYear() &&
                date.getMonth() === now.getMonth() &&
                date.getDate() === now.getDate()
            if (isSameDay) {
                return useDateFormat(date, 'HH:mm').value
            } else {
                return useDateFormat(date, 'DD/MM/YYYY - HH:mm').value
            }

        }
    },
    async mounted() {

        unsubscribeAuth = subscribeToAuthStateChanges(userStatus => this.user = userStatus);

        unsubscribeChat = subscribeToChatNewMessages(async message => {

            //obtener perfil para mostrar en el chat sin recargar
            const profile = await getUserProfileByPK(message.user_profile_id);
            message.user_profiles = profile;

            this.messages.push(message);

            await this.$nextTick();

            this.$refs.messagesContainer.scrollTo({
                top: this.$refs.messagesContainer.scrollHeight,
                behavior: "smooth"
            });

        });

        this.messages = (await getLastChatMessages()).reverse(); //invertir array para que los ultimos 10 mensajes, aparezcan los ultimos abajo

        this.loading = false;

        //para que cuando se cargue la pagina scrollee para abajo
        await this.$nextTick();

        //scroll automatico al final del chat
        this.$refs.messagesContainer.scrollTo({
            top: this.$refs.messagesContainer.scrollHeight,
            behavior: "smooth"
        });
    },
    unmounted() {
        unsubscribeAuth();
        unsubscribeChat();
    },
    computed: {
        groupedMessages() {
            const result = [];
            let lastAuthorId = null;
            let toggle = 0;

            for (const message of this.messages) {
                if (message.user_profiles?.id !== lastAuthorId) {
                    toggle = 1 - toggle;
                    lastAuthorId = message.user_profiles?.id;
                }

                result.push({
                    ...message,
                    groupStyle: toggle
                });
            }

            return result;
        }
    }

}
</script>

<template>
    <section data-aos="fade">
        <div class="px-4 py-8 mx-auto w-full max-w-7xl">
            <h2 class="font-bold text-3xl mb-5 md:mb-8">Chat</h2>
            <div class="flex flex-col md:flex-row items-start lg:items-end justify-between gap-7 md:gap-20 mb-10">
                <div class="md:basis-3/5">
                    <template v-if="loading">
                        <div class="flex w-full md:h-[25vh] lg:h-[50vh] justify-center items-center">
                            <MainLoader />
                        </div>
                    </template>
                    <template v-else>
                        <div class="chat-container overflow-visible overflow-y-hidden chat w-full border rounded-2xl">

                            <div class="overflow-y-auto h-full max-h-svh"
                                 ref="messagesContainer">

                                <ol class="flex flex-col items-start gap-4 p-4"
                                    aria-label="chat"
                                    role="list">
                                    <li v-for="message in groupedMessages"
                                        role="listitem"
                                        :key="message.id"
                                        :class="['p-4 rounded-3xl break-all w-7/8',
                                            message.groupStyle === 0 ? 'bg-light' : 'bg-light/50',
                                            message.user_profiles?.id === user.id ? 'ml-auto text-right' : ''
                                        ]">
                                        <RouterLink v-if="message.user_profiles"
                                                    :to="`/perfil/${message.user_profiles.id}`"
                                                    class="text-primary-dark"><span class="font-semibold">{{
                                                        message.user_profiles.full_name }}</span> dijo:
                                        </RouterLink>
                                        <p class="mb-2">{{ message.message }}</p>
                                        <p class="text-primary text-sm text-right">{{ formatDate(message.created_at) }}
                                        </p>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </template>
                </div>

                <div class="enviar-mensaje md:basis-2/5 w-full">
                    <h2 class="font-bold text-2xl mb-5 md:mb-8">Mensaje nuevo</h2>
                    <div class="crear-post bg-light border rounded-2xl p-4">
                        <form action="#"
                              @submit.prevent="sendMessage">

                            <label for="content"
                                   class="block mb-3">Mensaje nuevo:</label>

                            <textarea placeholder="Mensaje *"
                                      id="message"
                                      name="message"
                                      required
                                      rows="4"
                                      v-model="message"
                                      class="bg-white mb-5"></textarea>
                            <div class="text-right">
                                <button type="submit"
                                        class="btn btn-primary inline-flex items-center">
                                    Enviar
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         fill="none"
                                         viewBox="0 0 24 24"
                                         stroke-width="1.5"
                                         stroke="currentColor"
                                         class="size-5 ml-2">
                                        <path stroke-linecap="round"
                                              stroke-linejoin="round"
                                              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                    </svg></button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>

    </section>
</template>