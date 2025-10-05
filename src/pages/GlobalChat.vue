<script>
import MainLoader from '../components/MainLoader.vue';
import { subscribeToAuthStateChanges } from '../services/auth';
import { getLastChatMessages, sendChatMessage, subscribeToChatNewMessages } from '../services/global-chat';
import { getUserProfileByPK } from '../services/user-profile';

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
}
</script>

<template>
    <section data-aos="fade"
        class="px-10 md:px-20 lg:px-30 mt-5 mb-5 h-[95vh] lg:h-[80vh] chat-global flex flex-col lg:flex-row justify-center gap-10">
        <h2 class="hidden">Chat global</h2>

        <section
            class="chat-container lg:overflow-visible overflow-y-hidden mt-10 mb-3 lg:mb-10 chat border border-[#348534] border-1 border-t-0 rounded w-full lg:w-9/12">
            <div
                class="sticky top-0 mt-1 bg-[#348534] p-4 text-xl font-bold text-white flex gap-2 justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-7">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                </svg>
                <h3>Chat Global</h3>
            </div>
            <template v-if="!loading">
                <div class="overflow-y-auto h-[80%]" ref="messagesContainer">
                    <h4 class="sr-only">Lista de mensajes</h4>

                    <ol class="flex flex-col items-start gap-4 p-4">
                        <li v-for="message in messages" :key="message.id"
                            class="p-4 rounded-3xl bg-green-100 border-[#348534] break-all">
                            <RouterLink v-if="message.user_profiles" :to="`/perfil/${message.id}`" class="mb-1">
                                <span class="font-bold text-[#348534]">{{ message.user_profiles.full_name }}</span>
                                dijo:
                            </RouterLink>
                            <p class="mb-1">{{ message.message }}</p>
                            <p class="text-sm text-gray-800">{{ message.created_at }}</p>
                        </li>
                    </ol>
                </div>
            </template>
            <template v-else>
                <div class="flex w-full md:h-[25vh] lg:h-[50vh] justify-center items-center">
                    <MainLoader />
                </div>
            </template>
        </section>

        <section class="mt-0 lg:mt-10 mb-10 lg:mb-0 enviar-mensaje w-[100%] lg:w-3/12">
            <h3 class="text-xl font-semibold text-[#348534] mb-5">Enviar un mensaje</h3>
            <form action="#" @submit.prevent="sendMessage">

                <div class="mb-4">
                    <label for="message" class="sr-only block mb-1">Mensaje</label>
                    <textarea placeholder="Mensaje *" id="message"
                        class="resize-none w-full p-2 border-1 border-[#348534] outline-none focus:ring-1 focus:ring-[#348534] rounded"
                        v-model="message"></textarea>
                </div>
                <button type="submit" class="flex gap-3 items-center justify-center transition-all duration-300 ease-in-out px-6 py-3 mt-6 lg:mt-0 rounded-3xl 
                    bg-[#348534] hover:bg-green-600 cursor-pointer font-bold text-xl uppercase text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    Enviar</button>
            </form>
        </section>

    </section>
</template>

<style>
input::placeholder {
    color: #348534;
}

textarea::placeholder {
    color: #348534;
}
</style>