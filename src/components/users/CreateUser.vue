<template>
<div class="create-user">
   <div class="text-center">
        <create @triggerModal="modal"></create>
   </div>
   <q-dialog
       v-model="medium"
       ref="createModal"
       persistent transition-show="scale" transition-hide="scale"
   >
       <q-card style="width: 700px; max-width: 80vw;">
           <q-card-section>
               <div class="text-h6">{{ $t("customers.newUser") }}</div>
           </q-card-section>

           <q-card-section class="q-pt-none">
               <q-form
                   @submit="createNew"
                   @reset="clearForm"
                   class="q-col-gutter-lg"
               >
                   <q-input
                       v-model="user.email"
                       label="Email"
                       autofocus
                       type="text"
                       :rules="[ val => val && val.length > 0 || `${this.$t('general.enterEmail')}`, isValidEmail]"
                   >
                       <template v-slot:prepend>
                           <q-icon name="alternate_email" />
                       </template>
                   </q-input>

                   <q-input
                       v-model="user.username"
                       label="Uporabniško ime"
                       type="text"
                       :rules="[ val => val && val.length > 3  || `${this.$t('general.enterUsername')}`]"
                   >
                       <template v-slot:prepend>
                           <q-icon name="person" />
                       </template>
                   </q-input>
                   <div>
                       <q-btn label="Ustvari"
                              :loading="submitting"
                              type="submit"
                              color="green"
                       >
                           <template v-slot:loading>
                               <q-spinner-tail
                                   color="white"
                               />
                           </template>
                       </q-btn>
                       <q-btn label="Počisti" type="reset" color="primary" flat class="q-ml-sm" />
                   </div>
               </q-form>
           </q-card-section>

           <q-card-actions align="right" class="bg-white text-teal">
               <q-btn flat label="Zapri" v-close-popup />
           </q-card-actions>
       </q-card>
   </q-dialog>
</div>
</template>

<script>

    import {mapActions} from 'vuex'
    import Create from "src/components/App/Create";
    import mixin from "src/global/mixin";

    export default {
        name: "CreateUser",
        mixins: [mixin],
        data() {
            return {
                medium: false,
                showUser: false,
                user: {
                    email: '',
                    username: ''
                },
                submitting: false
            }
        },
        components: {
            Create
        },
        methods: {
            ...mapActions({
               addUser: 'users/addUser'
            }),
            modal(param) {
               this.medium = param
            },
            clearForm() {
                this.user = {}
            },
            createNew() {
                this.submitting = true
                this.addUser(this.user)
                    .then((response) => {
                        this.showNotif(response, 'positive')
                        setTimeout(() => {
                            this.submitting = false
                            this.$refs.createModal.hide()
                        }, 500)
                    })
                    .catch((e) => {
                        this.showNotif(e, 'negative')
                        this.submitting = false
                    })
            }
        }
    }
</script>

<style scoped>

</style>
