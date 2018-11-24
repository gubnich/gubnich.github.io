import SearchBar from './components/searchbar/index.js';
import Carousel from './components/carousel/index.js';
import Clip from './components/carousel/Clip.js';
import Pagination from './components/pagination/Pagination.js';

const body = document.createElement('div');
body.classList.add('wrapper');
const searchbar = new SearchBar();
const carousel = new Carousel();
const pagination = new Pagination();
body.append(searchbar.self);
body.append(carousel.self);
body.append(pagination.self);
document.body.prepend(body);

function submit(event) {
    if(event) {
        event.preventDefault();
       
    }
  
    searchbar.youtube.search(searchbar.input.value).then(
        (result) => {
            const clips = document.createDocumentFragment();
            const items = JSON.parse(result.response).items;
            searchbar.youtube.next = JSON.parse(result.response).nextPageToken;
            items.forEach( (item, i) => {
                const clip = new Clip(item);
                searchbar.youtube.getViews(item.id.videoId).then(
                    (res) => {
                        const items = JSON.parse(res.response).items;
                        clip.views.innerText = items[0].statistics.viewCount;
                    }
                )
                clips.append(clip.self); 
            });
            carousel.self.append(clips);
            /*
            carousel.clipsPerPage = carousel.getClipsPerPage();
            carousel.pagesAmount = carousel.getPagesAmount();
            */
            carousel.updateProps();
            if(pagination.empty) {
                console.log(searchbar.youtube.maxResults / carousel.clipsPerPage);
                pagination.updateControls(Math.round(searchbar.youtube.maxResults / carousel.clipsPerPage));
            }
        },
        (result)=>{
            console.log('reject');
        }
    )
}

searchbar.self.addEventListener('submit', submit);
let diff;
window.onresize = () => {
    /*
    carousel.clipsPerPage = carousel.getClipsPerPage();
    carousel.pagesAmount = carousel.getPagesAmount();
    carousel.pageNumber = carousel.getClipsLeft() / carousel.getClipsPerPage();
    */
    carousel.updateProps();
    console.log('количество клипов на странице',carousel.clipsPerPage);
    console.log('количество страниц', carousel.pagesAmount);
    console.log('количество клипов слева', carousel.clipsLeft);
    console.log('номер страницы', carousel.pageNumber);
    //carousel.self.style.transform = `translateX(${-100*carousel.pageNumber}%)`;
    //pagination.updateControls(searchbar.youtube.maxResults / carousel.clipsPerPage);
    diff = carousel.pageNumber - carousel.prevPageNumber;
    //diff = carousel.prevClipsPerPage - carousel.clipsPerPage + 1;
    console.log(diff);
    if(carousel.prevClipsPerPage - carousel.clipsPerPage > 0){
       
        //carousel.pageNumber += diff;
        carousel.self.style.transform = `translateX(${-100*carousel.pageNumber}%)`;
        carousel.self.style.transition = 'transform 1s';
        pagination.controls.forEach(elem => {
            
            elem.innerText = (Number(elem.innerText) + diff)
        });
        
    }
    
    if(carousel.prevClipsPerPage - carousel.clipsPerPage < 0){
        //carousel.pageNumber -= diff;
        carousel.self.style.transform = `translateX(${-100*carousel.pageNumber}%)`;
    carousel.self.style.transition = 'transform 1s';
       
        pagination.controls.forEach(elem => elem.innerText = Number(elem.innerText) + diff);
    }
    
    
}

let eventdownPoint = 0;
function eventdown(event){
   
    eventdownPoint = event.pageX || event.changedTouches[0].pageX;
    carousel.self.style.transition = null;
    //mousemove();
    carousel.self.addEventListener('mousemove', eventmove);
    carousel.self.addEventListener('touchmove', eventmove);
}

function eventmove(){
    let eventmovePoint = event.pageX || event.changedTouches[0].pageX;
    carousel.self.style.transform = `translateX(${carousel.pageNumber *(-carousel.self.clientWidth) + eventmovePoint - eventdownPoint}px)`;
}
/*
function mousemove(){
    carousel.self.onmousemove = (event) => {
        carousel.self.style.transform = `translateX(${carousel.pageNumber *(-carousel.self.clientWidth) + event.pageX - eventdownPoint}px)`;
    }
    carousel.self.ontouchmove = (event) => {
        carousel.self.style.transform = `translateX(${carousel.pageNumber *(-carousel.self.clientWidth) + event.touches[0].pageX - eventdownPoint}px)`;
    }
}
*/
function move(){
    carousel.clipsLeft = carousel.pageNumber * carousel.clipsPerPage;
    carousel.self.style.transform = `translateX(${-100*carousel.pageNumber}%)`;
    carousel.self.style.transition = 'transform 1s';
}

function eventup(){
    /*
    carousel.self.onmousemove = null;
    carousel.self.ontouchmove = null;
    */
    carousel.self.removeEventListener('mousemove', eventmove);
    carousel.self.removeEventListener('touchmove', eventmove);
    
    let eventupPoint = event.pageX || event.changedTouches[0].pageX;
    if(eventupPoint < eventdownPoint) {
        if(carousel.pageNumber < carousel.pagesAmount - 1) {
            carousel.pageNumber++;
            if(pagination.controls[pagination.currentControl].getAttribute('data-index') < pagination.controls.length -2){
               
                pagination.controls[pagination.currentControl].classList.remove('current');
                pagination.currentControl++;
                pagination.controls[pagination.currentControl].classList.add('current');
            } else {
                pagination.controls.forEach(elem => elem.innerText++);
            }
        }
        move();
        
    }
    if(eventupPoint > eventdownPoint && carousel.pageNumber >= 0) { 
        if(carousel.pageNumber > 0) {
            carousel.pageNumber--;
            if(pagination.controls[pagination.currentControl].getAttribute('data-index') > 1 || pagination.controls[pagination.currentControl].innerText === '2'){
                pagination.controls[pagination.currentControl].classList.remove('current');
                pagination.currentControl--;
                pagination.controls[pagination.currentControl].classList.add('current');
            }else {
                pagination.controls.forEach(elem => elem.innerText--);
            }
        }
        move();
    }
   
    if(carousel.pageNumber >= carousel.pagesAmount / 2){
      
        submit();
        carousel.clipsTotal += searchbar.youtube.maxResults;
        carousel.pagesAmount = carousel.getPagesAmount();
        
    }
}

carousel.self.addEventListener('mousedown', eventdown);
carousel.self.addEventListener('touchstart', eventdown);

carousel.self.addEventListener('mouseup', eventup);
carousel.self.addEventListener('touchend', eventup);

pagination.self.addEventListener('click', eventclick);

pagination.self.addEventListener('touchstart', (event) => {
    
        const span = document.createElement('span');
        if(event.target.innerText.length < 6){
            span.innerText = event.target.innerText;
        }
        span.classList.add('display');
        event.target.append(span);
    
})
pagination.self.addEventListener('touchend', (event) => {

    event.target.lastChild.remove();
})

function changeControl(next) {
    pagination.controls[pagination.currentControl].classList.remove('current');
    pagination.currentControl = next;
    
    pagination.controls[next].classList.add('current');
}
function eventclick() {
    const cellNumber = Number(event.target.innerText);
    if(!cellNumber) return;
    carousel.pageNumber = cellNumber - 1;
    
    if(event.target === pagination.firstControl){
        if(cellNumber > 1) {
            pagination.controls.forEach(elem => elem.innerText--);
            changeControl(1);
        }
        if(cellNumber === 1) {
            changeControl(event.target.getAttribute('data-index'));
        }
        move();            
    } else if(event.target === pagination.lastControl){
        if(carousel.pageNumber >= carousel.pagesAmount / 2){
            submit();
            carousel.clipsTotal += searchbar.youtube.maxResults;
            carousel.pagesAmount = carousel.getPagesAmount();
        }  
        changeControl(event.target.getAttribute('data-index') - 1);
        move();
        pagination.controls.forEach(elem => elem.innerText++);        
    } else if (cellNumber < pagination.lastControl.innerText){
            if(carousel.pageNumber >= carousel.pagesAmount / 2){
                submit();
                carousel.clipsTotal += searchbar.youtube.maxResults;
                carousel.pagesAmount = carousel.getPagesAmount();
            }
        changeControl(event.target.getAttribute('data-index'));
        move();
    }
    
}
