// open media_menu when click on icon open_media_menu that class is : open_media_menu and close when click out of window
let click = 0
$('.open_media_menu').click(()=>{
    if(click == 0){
        $('.menu_list').css('display','flex')
        $('.menu_list').css('flex-direction','column')
        click++;
    }else{
        $('.menu_list').css('display','none')
        $('.menu_list').css('flex-direction','row')
        click = 0
    }
})
//Close cart window by click on close_cart
$('.close_cart').click(()=>{
    $('.cart_Window').css('display','none')
})
//open cart window by click on open_cart
$('.open_cart').click(()=>{
    $('.cart_Window').css('display','flex');
})

//Close favorite window by click on close_favorite
$('.close_favorite').click(()=>{
    $('.favorite_Window').css('display','none')
})
//open favorite window by click on open_favorite
$('.open_favorite').click(()=>{
    $('.favorite_Window').css('display','flex');
    $('.favoriteProducts').html('');
})

//Active The Counter Up of Number
$('.number').counterUp({time:1000});

const changeImageProduct = (index,color)=>{
    $($('.productImage')[index]).attr('src',`images/products/${color}`)
}

let Product_Template = (product,ind)=> `<div class="card d-flex flex-column position-relative swiper-slide" data-aos="fade-up">
                <div class='halfCircle'></div>
                <div class='halfCircleBottom'></div>
                <div class='position-relative'>
                    ${product.sale !== '' ? `
                        <img src='images/offer.png' alt='offer' class='logo position-absolute'/>
                        <p class='offerPercentage position-absolute'>${product.sale}%</p>
                    ` : ``}
                    <img src='images/products/${product.images[0]}' alt="product" class="productImage w-100"/>
                </div>
                <div class='colors d-flex justify-content-start align-items-start w-100' style="gap:10px">
                    ${
                        product.images.map(color=>`
                            <img src="images/products/${color}" alt="color" class="color border border-1 border-black" onclick="changeImageProduct('${ind}','${color}')"/>
                        `).join('')
                    }
                </div>
                <div class="body-card">
                    <h1 class="card-title">${product.title}</h1>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class='d-flex justify-content-start align-items-center' style="gap:10px">
                            <i class="fa-solid fa-cart-plus" onclick='addToCart(${JSON.stringify(product)},${ind})'></i>
                            <i class="fa-solid fa-heart-circle-plus" onclick='addToFavorit(${JSON.stringify(product)},${ind})'></i>
                        </div>
                        <div class="d-flex flex-column align-items-center">
                            ${product.sale !== '' ? `<p class="text-decoration-line-through" style='margin-bottom:-6px;opacity:0.5'>${product.price} JOD</p>` : `<p></p>`}
                            ${product.sale !== '' ? `<p class="fs-3 fw-bolder text-danger">${(product.price - (product.price * (product.sale / 100))).toFixed(2)} JOD</p>` : `<p class="fs-3 fw-bolder">${product.price} JOD</p>`}
                        </div>
                    </div>
                </div>
            </div>
`
// fetch Product
let All , New , OffAll;
fetch('db.json',{method:'GET',headers: {'Content-Type': 'application/json'}})
.then(response => response.json())
.then(data => {
   (data.Product.slice(0,5)).map((product,ind) =>$('.productsBlock').append(Product_Template(product,ind)));
   All = data.Product;
   New = data.Product.sort((a,b)=> new Date((b.Arrival).split('/').reverse().join(' ')) - new Date((a.Arrival).split('/').reverse().join(' ')));
   Offers = New.filter(a => a.sale && a);
   Popular = data.Product.sort((a,b)=> b.saller - a.saller);
})
.then(()=>$('.productsBlock').append(`<div class="bg-dark card d-flex justify-content-center align-items-center swiper-slide seeMore data-aos="fade-up"">
        <i class="fa-solid fa-plus"></i>
        <a>see more</a>
        </div>`))
.then(()=> new Swiper(".mySwiper", {
        slidesPerView: 1,  
        spaceBetween: 10, 
        loop: false,       
        freeMode: true,   
        breakpoints: {
            320: {
                slidesPerView: 1,  
                spaceBetween: 15,
            },
            576: {
                slidesPerView: 2,  
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3, 
                spaceBetween: 25,
            },
            992: {
                slidesPerView: 4,  
                spaceBetween: 30,
            }
        }
    })
)
.catch(error => console.log(error))


AOS.init({
    duration:1200
});

var swiper = new Swiper(".slider", {
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    speed: 2000,

    on: {
        autoplayTimeLeft: function (s, time, progress) {
            $('.sliderView').css('width',`${progress*100}%`)
        }
    },
   
});


//Offer Timer
let D = $('.days')[0];
let H = $('.hours')[0];
let M = $('.minutes')[0];
let S = $('.seconds')[0];

let days , hours , minutes , seconds;

// Calculate the time difference in different units
function CalcDifferent(different){

    days = Math.floor(different / (1000 * 60 * 60 * 24)); 
    different -= days * (1000 * 60 * 60 * 24);

    hours = Math.floor(different / (1000 * 60 * 60));
    different -= hours * (1000 * 60 * 60);

    minutes = Math.floor(different / (1000 * 60)); 
    different -= minutes * (1000 * 60);

    seconds = Math.floor(different / 1000);

    D.textContent = days > -1 && days.toString().padStart(2, '0');
    H.textContent = hours > -1 && hours.toString().padStart(2, '0');
    M.textContent = minutes > -1 && minutes.toString().padStart(2, '0'); 
    S.textContent = seconds > -1 && seconds.toString().padStart(2, '0');    
}

let CountDownTime = setInterval(()=>{
    let today = new Date(); 
    today.setDate(today.getDate() + 5);
    today.setHours(12, 0, 0, 0);

    let different = today.getTime() - new Date().getTime();

    if(different > 0){
        CalcDifferent(different)    
    }else{
        clearInterval(CountDownTime)
    }
},1000);


//Scroll To Top When Click on iconScrollTop
window.addEventListener('scroll',()=>{
    window.scrollY > 300 ? $('.iconScrollTop').css('display','block') : $('.iconScrollTop').css('display','none')
})

$('.iconScrollTop').click(()=>{
   document.documentElement.scrollTop = 0;
})

//Scroll To Contact When Click on iconSupportTeam
$('.iconSupportTeam').click(()=>{
    $('.support input[type="text"]').focus();
})

window.addEventListener('scroll', function() {
    if(document.documentElement.scrollTop >= 5273.60009765625 && document.documentElement.scrollTop < 5624.7998046875){
        $('.iconSupportTeam').css('display','none')
    }else{
        $('.iconSupportTeam').css('display','block')
    }
});

//validation of form when click on sendEmailButton
$("#supportTeam").validate({
    rules:{
        email:{required:true,email:true},
        message:{required:true}
    },
    submitHandler: function(form) {
        console.log('submit')
        $(form).submit();
    }
});

// view popup 
const popup = document.getElementById('signin-popup');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close-popup');

let popupClosed = localStorage.getItem('popupClosed');

function showPopup() {
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function hidePopup() {
    popup.style.display = 'none';
    overlay.style.display = 'none';
}

if (!popupClosed) {
    showPopup();
}

closeBtn.addEventListener('click', function() {
    hidePopup();
    localStorage.setItem('popupClosed', 'true');
    
    !localStorage.getItem('Favorite') && localStorage.setItem('Favorite',JSON.stringify([]));

    !localStorage.getItem('Cart') && localStorage.setItem('Cart',JSON.stringify([]));

    !localStorage.getItem('countProductInCart') && localStorage.setItem('countProductInCart',0);

     $('.count')[0].textContent = JSON.parse(localStorage.getItem('Favorite')).length;
     $('.count')[1].textContent = localStorage.getItem('countProductInCart');

});

window.addEventListener('beforeunload', function() {
    localStorage.removeItem('popupClosed');
});

const filterProuct = (e)=>{
   Array.from(e.parentElement.children).map(li=>{
        li.classList.contains('active') && li.classList.remove('active')
        e.classList.add('active')
   })

   $('.productsBlock').html('');

   UpdateProductBySort(e.getAttribute('value'))
}

const UpdateProductBySort = (arr)=>{
    switch(arr){
        case 'New': (New.slice(0,5)).map((product,ind) =>$('.productsBlock').append(Product_Template(product,ind)))
                    break;
        case 'Offers': (Offers.slice(0,5)).map((product,ind) =>$('.productsBlock').append(Product_Template(product,ind)))
                    break;
        case 'Popular': (Popular.slice(0,5)).map((product,ind) =>$('.productsBlock').append(Product_Template(product,ind)))
                    break;
        case 'All' : (All.slice(0,5)).map((product,ind) =>$('.productsBlock').append(Product_Template(product,ind)))
                    break;
    }
    $('.productsBlock').append(`<div class="bg-dark card d-flex justify-content-center align-items-center swiper-slide seeMore data-aos="fade-up"">
        <i class="fa-solid fa-plus"></i>
        <a>see more</a>
        </div>`);

     new Swiper(".mySwiper", {
        slidesPerView: 1,  
        spaceBetween: 10, 
        loop: false,       
        freeMode: true,   
        breakpoints: {
            320: {
                slidesPerView: 1,  
                spaceBetween: 15,
            },
            576: {
                slidesPerView: 2,  
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3, 
                spaceBetween: 25,
            },
            992: {
                slidesPerView: 4,  
                spaceBetween: 30,
            }
        }
    })
}

function InsertProductInCart(){
    $('#checkoutNum')[0].textContent = localStorage.getItem('countProductInCart');
    let total = 0;
    $('#totalPrice')[0].textContent = total.toFixed(2);
    JSON.parse(localStorage.getItem('Cart')).map((product,index) => {
        product = JSON.parse(product);
        total += ((product.price - (product.price * (product.sale / 100))).toFixed(2)) * product.quantity
        $('#totalPrice')[0].textContent = total.toFixed(2);

        const card = $(`
            <div class="card bg-transparent shadow w-100 mb-2" style='max-height:160px'>
                <div class='d-flex justify-content-start align-items-center w-100 h-100'>
                    <img style='width:115px;height:115px' class='m-2' src='${product.images}' alt="producr"/>
                    <div class='p-2' style='width:calc(100% - 115px)'>
                        <h5 class="card-title fs-6">${product.title}</h5>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex flex-column align-items-center">
                                ${product.sale !== '' ? `<p class="text-decoration-line-through me-2" style='margin-bottom:-10px;opacity:0.5;font-size:13px'>${product.price} JOD</p>` : `<p></p>`}
                                ${product.sale !== '' ? `<p class="fs-5 fw-bolder text-danger">${(product.price - (product.price * (product.sale / 100))).toFixed(2)} JOD</p>` : `<p class="fs-5 fw-bolder">${product.price} JOD</p>`}
                            </div>
                            ${product.sale && `<div class="text-danger fw-bolder fs-4">${product.sale}%</div>`}
                        </div>
                    </div>
                </div>
                <div class="controllerProductButton  text-center d-flex justify-content-between align-items-ceneter ps-4 pe-4 pb-2 pt-2">
                    <i class="fa-solid fa-trash deleteProduct"></i>
                    <div class="d-flex justify-content-center align-items-center text-center">
                        <i class="fa-solid fa-plus me-2 DecreaseQuantity"></i>
                        <span>${product.quantity}</span>
                        <i class="fa-solid fa-minus ms-2 increaseQuantity"></i>
                    </div>
                </div>
            </div>
        `);
        card.find('.DecreaseQuantity').on('click', () => changeQuantity(product,'+'));
        card.find('.increaseQuantity').on('click', () => changeQuantity(product,'-'));
        card.find('.deleteProduct').on('click',()=> deleteProduct(product,'Cart'));

        $('#cartProducts').append(card);
    })
}

function InsertProductInFavorite() {
    JSON.parse(localStorage.getItem('Favorite')).map((product, index) => {
        product = JSON.parse(product);
        const card = $(`
            <div class="card bg-transparent shadow w-100 mb-2" style='max-height:160px'>
                <div class='d-flex justify-content-start align-items-center w-100 h-100'>
                    <img style='width:115px;height:115px' class='m-2' src='${product.images}' alt="product"/>
                    <div class='p-2' style='width:calc(100% - 115px)'>
                        <h5 class="card-title fs-6">${product.title}</h5>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex flex-column align-items-center">
                                ${product.sale !== '' ? `<p class="text-decoration-line-through me-2" style='margin-bottom:-10px;opacity:0.5;font-size:13px'>${product.price} JOD</p>` : `<p></p>`}
                                ${product.sale !== '' ? `<p class="fs-5 fw-bolder text-danger">${(product.price - (product.price * (product.sale / 100))).toFixed(2)} JOD</p>` : `<p class="fs-5 fw-bolder">${product.price} JOD</p>`}
                            </div>
                            ${product.sale && `<div class="text-danger fw-bolder fs-4">${product.sale}%</div>`}
                        </div>
                    </div>
                </div>
                <div class="controllerProductButton text-center d-flex justify-content-between align-items-center ps-4 pe-4 pb-2 pt-2">
                    <i class="fa-solid fa-trash deleteProduct"></i>
                    <i class="fa-solid fa-cart-shopping add-to-cart"></i>
                </div>
            </div>
        `);

        card.find('.add-to-cart').on('click', () => addToCart(product, index, product.images));
        card.find('.deleteProduct').on('click',()=> deleteProduct(product,'Favorite'));


        $('#favoriteProducts').append(card);
    });
}

InsertProductInCart();
InsertProductInFavorite();

