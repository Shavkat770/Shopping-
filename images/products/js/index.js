// Тут будет писаться основной код
// Не пугайтесь этой штуки import
import { brands, products } from './data.js';

let def_width = document.querySelector('.def_width')
let right_center = document.querySelector('main .right_center')
let count_cart = document.querySelector('header .cart_icon span')
let body = document.querySelector('body')
let wrapper = document.querySelector('.wrapper')
let left_dark = document.querySelector('.wrapper .left_side')
let right_dark = document.querySelector('.wrapper .right_side')
let right_fav_dark = document.querySelector('.favorites .right_side_fav')
let link_info = document.querySelector('.favorites .links')

let i = 0
count_cart.innerText = i
let cart = []
let favorites = document.querySelector('.favorites')
let cart_icon = document.querySelector('.cart_icon')
let footer = document.querySelector('.footer')
let rightSide = document.querySelector('.wrapper_fav')
let total = 0
let close = document.querySelector('.close')
let p1 = document.querySelector('.p')
let categories = document.querySelector('.categories')
let range = document.querySelector('#range')
let range_span = document.querySelector('#range_span')
let dark_mode = document.querySelector('.dark_mode')
let btn_dark = document.querySelector('#btn_dark')
let btn_light = document.querySelector('#btn_light')
btn_light.style.display = 'none'
let sort_br = document.querySelector('.sort_br')
let sort_br_dl = document.querySelector('.sort_br_dl')
sort_br_dl.style.display = 'none'
let links = document.querySelector('.links')
let form_search = document.querySelector('.search')
let btn_search = document.querySelector('.btn_search')
let sort1 = []
let sort2 = 0
let sortBrand_price = []

for(let item2 of brands){
        let name_brands = document.createElement('a')
        name_brands.innerText = item2.name
        name_brands.setAttribute('href','#')
        name_brands.classList.add('name_brands')
        
        categories.append(name_brands)

        name_brands.onclick = () =>{
            event.preventDefault()

            name_brands.classList.toggle('name_brands_act')
            if(sort1.filter(el => el == item2.id)[0]){
                sort1.splice(sort1.indexOf(sort1.filter(el => el == item2.id)[0]),1)//'el' as element or item
                console.log('Delete')
            }else{
                sort1.push(item2.id)
                console.log('Add')
            }
        }
    }
let reload_page = (arr) =>{
    right_center.innerHTML = ''
for (let item of arr) {

    let items = document.createElement('div')
    items.classList.add('item')

    let img_div = document.createElement('div')
    img_div.classList.add('img')

    let img_one = document.createElement('img')
    img_one.classList.add('img_one')

    let a = document.createElement('a')
    a.href = '#'
    a.classList.add('a')

    let p = document.createElement('p')
    p.classList.add('t')


    let btns_div = document.createElement('div')
    btns_div.classList.add('btns_div')

    let addCart = document.createElement('button')
    addCart.classList.add('btn_cart')
    addCart.setAttribute('id', item.id)
    addCart.innerText = 'Добавить в корзину'
    btns_div.append(addCart)

    let delete_cart = document.createElement('button')
    delete_cart.classList.add('delete_cart')
    delete_cart.setAttribute('id', item.id)
    delete_cart.innerText = 'Удалить из корзины'
    btns_div.append(delete_cart)
    delete_cart.style.display = 'none'

    items.append(img_div, a, p, btns_div)
    right_center.append(items)
    img_div.append(img_one)

    img_one.src = item.image
    a.innerText = item.name
    p.innerText = `$${item.price}`
    a.style.fontSize = '25px'
    p.style.fontSize = '20px'


    range.onchange = () =>{
        sort2 = +event.target.value
        range_span.innerText = +event.target.value + '$'
        
        console.log(sort2)

    }

    let orders_id = Math.random().toString().slice(2, 10)
    let orders = document.createElement('div')
    orders.classList.add('orders')
    orders.setAttribute('id', orders_id)
    
    addCart.onclick = () => {
        
        addCart.style.display = 'none'
        delete_cart.style.display = 'block'
        delete_cart.style.backgroundColor = 'red'
        let id = event.target.getAttribute('id')

        i++
        count_cart.innerText = i
        

        cart.push(addCart.getAttribute('id'))
        console.log(cart)

        if (id == item.id) {
            
            let img = document.createElement('img')
            img.classList.add('img_fav')
            let p = document.createElement('p')
            p.classList.add('name_fav')
            let product_tool = document.createElement('div')
            product_tool.classList.add('product_tool')
            let subtract = document.createElement('button')
            subtract.classList.add('btn_fav')
            let indicate = document.createElement('div')
            indicate.classList.add('btn_fav')
            let add = document.createElement('button')
            add.classList.add('add')

            let h5 = document.createElement('h5')
            h5.classList.add('price_fav')

            let error = document.createElement('p')
            error.classList.add('error')
            error.innerText = 'В наличии 3 штуки'
            error.style.display = 'none'
        
            img.src = item.image
            p.innerText = item.name
            h5.innerText = '$' + item.price
            subtract.innerText = '-'
            indicate.innerText = '0'
            add.innerText = '+'

            product_tool.append(subtract, indicate, add)
            orders.append(img,p, product_tool, h5,error)
            rightSide.append(orders)
            orders.style.display = 'flex'

            let j = 1
            indicate.innerText = j

            subtract.onclick = () => {
                j--
                if (j >= 0) {
                    indicate.innerText = j
                    error.style.display = 'none'
                    add.style.borderColor = 'transparent'
                }
                else {
                    j = 0
                }

                let sum = j * item.price
                h5.innerText = `$${sum}`

                total -= item.price
                if(total >= 0){
                    p1.innerText = `$${total}`
                }
                else{
                    total = 0
                }
                
            }
            add.onclick = () => {
                j++
                if (j <= 3) {
                    indicate.innerText = j
                    let sum = j * item.price
                    h5.innerText = `$${sum}`
                    total += item.price
                    p1.innerText = `$${total}`
                    
                }
                else {
                    j = 3
                    error.style.display = 'block'
                    add.style.borderColor = 'red'
                }
            }
            total += item.price
        }
        p1.innerText = '$' + total
    }

delete_cart.onclick = () => {

            let id = event.target.getAttribute('id')

            addCart.style.display = 'block'
            delete_cart.style.display = 'none'


            i--
            count_cart.innerText = i

            

            let find = cart.filter(item => item == id)[0]
            cart.splice(cart.indexOf(find), 1)
            console.log(cart)
            let j = 0
            j--
            let sum = j * item.price

            total -= orders.children[3].innerText
            
            if (total >= 0) {
                p1.innerText = total
            }
            else {
                total = 0
            }
            if (orders.getAttribute('id') == orders_id) {
                orders.innerHTML = ''
                p1.innerHTML = ''
            }
     }    
   btn_dark.onclick = () =>{
    event.preventDefault()
    
    btn_light.style.display = 'block'
    btn_dark.style.display = 'none'
    dark_mode.classList.add('dark_mode_act')
    // right_center.classList.add('center_dark')
    // header.style.backgroundColor = 'black'
    body.style.backgroundColor = '#262626'
    right_center.classList.add('dark_color')
    right_center.classList.remove('right_center')
    range_span.classList.remove('range_span')
    range_span.classList.add('span_dark')
    wrapper.classList.add('wrapper_dark')
    wrapper.classList.remove('wrapper')
    left_dark.classList.add('left_dark')
    left_dark.classList.remove('left_side')
    right_dark.classList.add('right_dark')
    right_dark.classList.remove('right_side')
    links.classList.add('links_dark')
    links.classList.remove('links')
    favorites.classList.add('favorites_dark')
    favorites.classList.remove('favorites')
    favorites.classList.remove('favorites_back')
    right_fav_dark.classList.add('right_fav_dark')
    right_fav_dark.classList.remove('right_side_fav')
    link_info.classList.add('link_dark')
    link_info.classList.remove('links')
    footer.classList.add('footer_dark')
    footer.classList.remove('footer')
    form_search.classList.add('form_dark')
    form_search.classList.remove('search')
    btn_search.classList.add('btn_search_dark')
    btn_search.classList.remove('btn_search')
}
btn_light.onclick = () =>{
    event.preventDefault()

    btn_light.style.display = 'none'
    btn_dark.style.display = 'block'
    dark_mode.style.backgroundColor = 'gray'
    body.style.backgroundColor = 'white'
    right_center.classList.remove('dark_color')
    right_center.classList.add('right_center')
    // right_center_2.classList.remove('dark_color_2')
    // right_center_2.classList.add('right_center_2')
    range_span.classList.add('range_span')
    range_span.classList.remove('span_dark')
    wrapper.classList.remove('wrapper_dark')
    wrapper.classList.add('wrapper')
    links.classList.remove('links_dark')
    links.classList.add('links')
    left_dark.classList.remove('left_dark')
    left_dark.classList.add('left_side')
    right_dark.classList.remove('right_dark')
    right_dark.classList.add('right_side')
    favorites.classList.remove('favorites_dark')
    favorites.classList.add('favorites')
    right_fav_dark.classList.remove('right_fav_dark')
    right_fav_dark.classList.add('right_side_fav')
    form_search.classList.remove('form_dark')
    form_search.classList.add('search')
    btn_search.classList.remove('btn_search_dark')
    btn_search.classList.add('btn_search')
        }

    }

}

reload_page(products)

cart_icon.onclick = () => {
    event.preventDefault()
    favorites.classList.add('favorites_back')
    def_width.style.display = 'none'
    footer.style.display = 'none'
}
close.onclick = () => {
    event.preventDefault()
    favorites.classList.remove('favorites_back')
    def_width.style.display = 'block'
    footer.style.display = 'block'
}
let search = document.forms.search

search.onsubmit = () =>{
    event.preventDefault()
	finally_sorted = []
	for(let item of products){
		let word = event.target.children[0].value.toLowerCase().trim()

		if(item.name.toLowerCase().includes(word)){
			finally_sorted.push(item)
			reload_page(finally_sorted)
		}
	}
}

let sorted_by_brands = []
let finally_sorted = []


sort_br.onclick = () => {
                event.preventDefault()
                sort_br_dl.style.display = 'block'
                sort_br.style.display = 'none'
                sorted_by_brands = []
                finally_sorted = []
            
                for (let item of products) {
                    for (let brand of sort1) {
                        if (item.brand_id == brand) {
                            sorted_by_brands.push(item)
                        }
                    }
                }
            
                for(let item of sorted_by_brands){
                    if (item.price <= sort2) {
                        finally_sorted.push(item)
                    }
                }
                
                reload_page(finally_sorted)
            }
    
            sort_br_dl.onclick = () => {
                let name_brands = document.querySelectorAll('.name_brands')
                finally_sorted = []
                sort_br_dl.style.display = 'none'
                sort_br.style.display = 'block'

                for (let item of products) {
                    sortBrand_price.splice(sortBrand_price.indexOf(sortBrand_price.filter(el => el == item.id)[0]), 1)
                    reload_page(products)
                }
                for (let item of name_brands) {
                    item.classList.remove('name_brands_act')
                }
                range_span.innerText = 0 + '$'
                console.log(sortBrand_price)
                
            }