// import axios from 'axios'
import {make} from 'vuex-pathify'

const state = {
    employees: [
        {
            name: 'Manish Prakash',
            technology: 'R.E.A.C.T',
            post: 'Sr.ReactJs Developer',
            id: 1,
            manager: [{
                image:'/img/a5.84f014f0.jpg',
                img_id:'one',
                name:'Mahima K'
            },
            {
                image:'/img/a3.f6dc73f2.jpg',
                img_id:'two',
                name: 'Manish'
            },
            {
                image:'/img/a6.2966ab8e.jpg',
                img_id:'three',
                name: 'Manish'
            },
            {
                image:'/img/a3.f6dc73f2.jpg',
                img_id:'four',
                name: 'Arun'
            },
            {
                image:'/img/a3.f6dc73f2.jpg',
                img_id:'five',
                name: 'Deepak'
            },
            {
                image:'/img/a6.2966ab8e.jpg',
                img_id:'six',
                name: 'Mahima k'
            }
            ]
        },
        {
            name: 'Manish Prakash',
            technology: 'KPI Name',
            post: 'ReactJs Developer',
            id: 2,
            manager: [
                {
                    image:'/img/a3.f6dc73f2.jpg',
                    img_id:'seven',
                    name: 'Arun'
                },
                {
                    image:'/img/a3.f6dc73f2.jpg',
                    img_id:'eight',
                    name: 'Deepak'
                },
                {
                    image:'/img/a6.2966ab8e.jpg',
                    img_id:'nine',
                    name: 'Mahima k'
                }   
            ]
        },
        {
            name: 'Manish Prakash',
            technology: 'KPI Name',
            post: 'Project Manager',
            id: 3,
            manager: [
                {
                    image:'/img/a3.f6dc73f2.jpg',
                    img_id:'ten',
                    name: 'Arun'
                },
            ]
        },
        {
            name: 'Manish Prakash',
            technology: 'KPI Name',
            post: 'ReactJs Developer',
            id: 4,
            manager: [
                {
                    image:'/img/a3.f6dc73f2.jpg',
                    img_id:'eleven',
                    name: 'Deepak'
                },
                {
                    image:'/img/a6.2966ab8e.jpg',
                    img_id:'twelve',
                    name: 'Mahima k'
                }
            ]
        },
        {
            name: 'Manish Prakash',
            technology: 'KPI Name',
            post: 'ReactJs Developer',
            id: 2,
            manager: [
                {
                    image:'/img/a3.f6dc73f2.jpg',
                    img_id:'thirteen',
                    name: 'Arun'
                },
                {
                    image:'/img/a3.f6dc73f2.jpg',
                    img_id:'forteen',
                    name: 'Deepak'
                },
                {
                    image:'/img/a6.2966ab8e.jpg',
                    img_id:'fifteen',
                    name: 'Mahima k'
                }   
            ]
        }
    ]
}
// const mutation = make.mutation(state)
const actions = {
    ...make.actions(state),
}


//create store
export default({
    namespaced: true,
    state,
    // mutation,
    actions
})
