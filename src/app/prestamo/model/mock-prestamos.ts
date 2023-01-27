import { PrestamoPage } from "./PrestamoPage";

export const PRESTAMO_DATA: PrestamoPage = {
    content: [
        { id: 1, game:{id: 1, title: 'Juego 1', age: 6, category: { id: 1, name: 'Categoría 1' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' }},client:{id:1,name:'Kike'},fecha_prestamo:new Date('2023-01-20'),fecha_devolucion:new Date('2023-01-25')},
        { id: 2, game:{ id: 5, title: 'Juego 5', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 2, name: 'Autor 2', nationality: 'Nacionalidad 2'}},client:{id:2,name:'Juan'},fecha_prestamo:new Date('2023-01-18'),fecha_devolucion:new Date('2023-01-28')},
        { id: 3, game:{id: 6, title: 'Juego 6', age: 16, category: { id: 2, name: 'Categoría 2' }, author: { id: 3, name: 'Autor 3', nationality: 'Nacionalidad 3' }},client:{id:3,name:'Marta'},fecha_prestamo:new Date('2023-01-16'),fecha_devolucion:new Date('2023-01-26')},
        { id: 4, game:{ id: 7, title: 'Juego 7', age: 12, category: { id: 3, name: 'Categoría 3' }, author: { id: 1, name: 'Autor 1', nationality: 'Nacionalidad 1' }},client:{id:4,name:'Julia'},fecha_prestamo:new Date('2023-01-15'),fecha_devolucion:new Date('2023-01-25')},
        
    ],  
    pageable : {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            {property: "id", direction: "ASC"}
        ]
    },
    totalElements: 4
}
