import { axiosInstance } from 'boot/axios'

export default {
    namespaced: true,
    state: {
        emyployees: [],
        employee: []
    },
    mutations: {
        SET_EMPLOYEES(state, payload) {
            state.emyployees = payload
        },
        SET_EMPLOYEE(state, payload) {
            state.employee = payload
        }
    },
    actions: {
        all({commit}) {
          axiosInstance.get('/employees')
                .then(response => {
                    commit('SET_EMPLOYEES', response.data.employees)
                })
        },
        edit({commit}, id) {
          axiosInstance.get(`/employees/${id}/edit`)
                .then(response => {
                    commit('SET_EMPLOYEE', response.data.employee)
                })
        },
        async update({dispatch}, employee) {
            return await axiosInstance.patch(`/employees/${employee.id}`, {
                'person': employee.person,
                'address': employee.address,
                'posta': employee.posta.posta
            })
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async remove({dispatch}, id) {
            return await axiosInstance.delete(`/employees/${id}`)
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        },
        async create({dispatch}, employee) {
            let newEmployee = {
                'person': employee.person,
                'address': employee.address,
                'posta': employee.posta.posta,
            }
            return await axiosInstance.post('/employees', newEmployee)
                .then((response) => {
                    dispatch('all')
                    return response.data.success
                })
                .catch((e) => {
                    throw (e.response.data.error);
                })
        }
    },
    getters: {
        getEmployees(state) {
            return state.emyployees
        },
        getEmployee(state) {
            return state.employee
        }
    }
}
