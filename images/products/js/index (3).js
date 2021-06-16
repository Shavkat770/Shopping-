// Тут будет писаться основной код
// Не пугайтесь этой штуки import
import { brands, products } from './data.js';

let right_center = document.querySelector('main .right_center')
let count_cart = document.querySelector('header .cart_icon span')
let cart_icon = document.querySelector('.cart_icon')
let payment_page = document.querySelector('.payment_page')
let header = document.querySelector('header')
let main_home_page = document.querySelector('.home-page')
let header_bt_img = document.querySelector('.header_bt_img')
let footer = document.querySelector('footer')
let rightSide = document.querySelector('.payment_page .right_side')
let close = document.querySelector('.modal-page-cart .buttons .close')
let screen_products = document.querySelector('.screen_products')
let bg_blur = document.querySelector('.bg_blur')
let totalCost = document.querySelector('.subheading .cost span')
let input_rng = document.querySelector('#range')
let input_span = document.querySelector('#range_span')
let categories = document.querySelector('.categorys')
let dark_mode = document.querySelector('.dark')
let light_mode = document.querySelector('.light')
let body = document.querySelector('body')

let cart = []
let sorted_brands = []
let sortBrand_price = []
let total_cost = 0
let sorted2 = 0

input_rng.onchange = () => {
    sorted2 = +event.target.value
    input_span.innerText = sorted2 + '$'
}

for (let item of brands) {
    let name_catg = document.createElement('a')
    name_catg.classList.add('name_brands')
    categories.append(name_catg)
    name_catg.innerText = item.name

    name_catg.setAttribute('id', item.id)
    name_catg.onclick = () => {
        name_catg.classList.toggle('ctg_active')
        if (sorted_brands.filter(el => el == item.id)[0]) {
            sorted_brands.splice(sorted_brands.indexOf(sorted_brands.filter(el => el == item.id)[0]), 1)
            console.log('Удалено')
        } else {
            sorted_brands.push(item.id)
            console.log('Добавлено')
        }
        console.log(sorted_brands)

        if (body.classList.contains('dark_body')) {
            name_catg.classList.remove('name_brands')
            name_catg.classList.remove('ctg_active')
            name_catg.classList.toggle('ctg_active_dark')
        }
        else {
            name_catg.classList.add('name_brands')
            name_catg.classList.remove('ctg_active_dark')
        }
    }
}

let reload = (arr) => {
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
        let p = document.createElement('p')
        p.classList.add('t')
        let btns_div = document.createElement('div')
        btns_div.classList.add('btns_div')

        let addCart = document.createElement('button')
        addCart.classList.add('btn_cart')
        addCart.setAttribute('id', item.id)
        addCart.innerText = 'добавить в корзину'
        btns_div.append(addCart)

        let delete_cart = document.createElement('button')
        delete_cart.classList.add('delete_cart')
        delete_cart.setAttribute('id', item.id)
        delete_cart.innerText = 'удалить из корзины'
        btns_div.append(delete_cart)



        let orders_id = Math.random().toString().slice(2, 10)
        let orders = document.createElement('div')
        orders.classList.add('orders')
        orders.setAttribute('id', orders_id)

        addCart.onclick = () => {
            orders.innerHTML = ''
            addCart.style.display = 'none'
            delete_cart.style.display = 'block'

            let id = event.target.getAttribute('id')
            cart.push(addCart.getAttribute('id'))
            count_cart.innerText = cart.length

            if (id == item.id) {
                let img = document.createElement('img')
                let p = document.createElement('p')
                let product_tool = document.createElement('div')
                product_tool.classList.add('product_tool')
                let subtract = document.createElement('div')
                subtract.classList.add('subtract')
                let indicate = document.createElement('div')
                indicate.classList.add('indicate')
                let add = document.createElement('div')
                add.classList.add('add')
                let h4 = document.createElement('h4')

                product_tool.append(subtract, indicate, add)
                orders.append(img, p, product_tool, h4)
                rightSide.append(orders)
                orders.style.display = 'flex'

                let j = 0
                j++

                img.src = item.image
                p.innerText = item.name
                h4.innerText = item.price + '$'
                subtract.innerText = '-'
                indicate.innerText = j
                add.innerText = '+'

                subtract.onclick = () => {
                    j--
                    indicate.innerText = j
                    if (j <= 0) {
                        orders.style.display = 'none'
                        delete_cart.style.display = 'none'
                        addCart.style.display = 'block'
                        let find = cart.filter(item => item == id)[0]
                        cart.splice(cart.indexOf(find), 1)
                    }

                    let sum = j * item.price
                    h4.innerText = sum
                    total_cost -= item.price

                    if (total_cost >= 0) {
                        totalCost.innerText = total_cost + '$'
                    } else {
                        return false
                    }
                    count_cart.innerText = cart.length
                }

                add.onclick = () => {
                    j++
                    indicate.innerText = j

                    let sum = j * item.price
                    h4.innerText = sum

                    total_cost += item.price
                    totalCost.innerText = total_cost + '$'
                }
                total_cost += item.price
                totalCost.innerText = total_cost + '$'
            }
        }

        delete_cart.onclick = () => {
            addCart.style.display = 'block'
            delete_cart.style.display = 'none'

            let id = event.target.getAttribute('id')
            let find = cart.filter(item => item == id)[0]
            cart.splice(cart.indexOf(find), 1)
            count_cart.innerText = cart.length
            console.log(cart)

            let j = 0
            j--

            total_cost -= orders.children[3].innerText

            if (total_cost >= 0) {
                totalCost.innerText = total_cost
            } else {
                return false
            }

            if (orders.getAttribute('id') == orders_id) {
                orders.style.display = 'none'
                totalCost.innerText = total_cost + '$'
            }

        }

        img_div.append(img_one)
        items.append(img_div, a, p, btns_div)
        right_center.append(items)

        img_one.src = item.image
        a.innerText = item.name
        p.innerText = item.price + '$'
    }
}
reload(products)
let fm = document.forms.search

fm.onsubmit = () =>{
	event.preventDefault()
	finally_sorted = []
	for(let item of products){
		let word = event.target.children[0].value.toLowerCase().trim()

		if(item.name.toLowerCase().includes(word)){
			finally_sorted.push(item)
			reload(finally_sorted)
		}
	}
}

let filtered_brands = []
let finally_sorted = []

let sort_br = document.querySelector('.sort_br').onclick = () => {
    event.preventDefault()
    
	filtered_brands = []
    finally_sorted = []

    for (let item of products) {
        for (let brand of sorted_brands) {
            if (item.brand_id == brand) {
                filtered_brands.push(item)
            }
        }
	}

    for(let item of filtered_brands){
        if (item.price <= sorted2) {
			finally_sorted.push(item)
		}
	}

	reload(finally_sorted)
}

let sort_br_dl = document.querySelector('.sort_br_dl').onclick = () => {
    let name_brands = document.querySelectorAll('.name_brands')
    for (let item of products) {
        sortBrand_price.splice(sortBrand_price.indexOf(sortBrand_price.filter(el => el == item.id)[0]), 1)
		reload(products)
    }
    for (let item of name_brands) {
        item.classList.remove('ctg_active')
    }
    input_span.innerText = 300 + '$'
    console.log(sortBrand_price)

    for(let item of name_catg){
        item.classList.remove('ctg_active_dark')
        item.classList.remove('ctg_active')

    }
}

cart_icon.onclick = () => {
    payment_page.style.display = 'block'
    payment_page.style.opacity = '1'
    payment_page.style.zIndex = '10'
    payment_page.style.animation = 'myanima .3s linear alternate'
    header.style.display = 'none'
    main_home_page.style.display = 'none'
    header_bt_img.style.display = 'none'
    footer.style.display = 'none'
}

close.onclick = () => {
    payment_page.style.opacity = '0'
    payment_page.style.zIndex = '-10'
    header.style.display = 'block'
    main_home_page.style.display = 'flex'
    header_bt_img.style.display = 'flex'
    footer.style.display = 'block'
    payment_page.style.animation = 'myanimaOFF .3s linear alternate'
}


let name_catg = document.querySelectorAll('.name_brands')
let links = document.querySelector('.home-page .links')
dark_mode.onclick = () => {
    event.target.style.display = 'none'
    light_mode.style.display = 'block'
    header.classList.add('dark_header')
    body.classList.add('dark_body')
    right_center.classList.add('dark_right')
    footer.classList.add('dark_footer')
    payment_page.classList.add('dark_payment')
    rightSide.classList.add('dark_calc')
    for (let item of name_catg) {
        if (item.classList.contains('ctg_active')) {
            item.classList.remove('ctg_active')
            item.classList.toggle('ctg_active_dark')
        }
    }
    if (body.classList.contains('dark_body')) {
        links.lastElementChild.classList.add('active_dark')
        links.lastElementChild.classList.remove('active')

    }
}
light_mode.onclick = () => {
    event.target.style.display = 'none'
    dark_mode.style.display = 'block'
    header.classList.remove('dark_header')
    body.classList.remove('dark_body')
    right_center.classList.remove('dark_right')
    footer.classList.remove('dark_footer')
    payment_page.classList.remove('dark_payment')
    rightSide.classList.remove('dark_calc')
    for (let item of name_catg) {
        if (item.classList.contains('ctg_active_dark')) {
            item.classList.remove('ctg_active_dark')
            item.classList.toggle('ctg_active')
        }
    }
    if(right_center.classList.contains('right_center')){
        links.lastElementChild.classList.remove('active_dark')
        links.lastElementChild.classList.add('active')        
    }
}