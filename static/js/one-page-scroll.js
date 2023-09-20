function OnePageScroll (interval){
    this.interval=interval;

    this.last_index=0;

    this.timeNow=0;
    this.lastAnimation=0;

    this.sections = document.querySelectorAll("section");

    this.sections.forEach((s,i) => {
        s.style.top=`calc(100vh * ${i})`
    });

    this.number_sections = ()=>{
        return this.sections.length
    }

    this.create_pagination = () => {
        $("body").prepend("<pagination></pagination>")

        for(let i=0; i<this.number_sections(); i++){
            let new_pagination_button = document.createElement("div")
            new_pagination_button.dataset.page=i
            $(new_pagination_button).click(()=>navigate_to(i+1))
    
            $("body pagination").append(new_pagination_button)
        }
    }

    this.select_current_pagination = (n) => {
        $("pagination div").removeClass("active");
        
        $(`pagination div:eq(${n})`).addClass("active")
    }

    this.navigate_to = (page_number) => {
        select_current_pagination(page_number-1)
        this.last_index=page_number-1; 

        $('html, body').animate({
            scrollTop: window.innerHeight*(page_number-1)
        }, { 
            duration:this.interval
        });
    }

    this.window_scroll_action = (e) => {
        this.timeNow = new Date().getTime();
    
        if(this.timeNow - this.lastAnimation < 1300) {
            e.preventDefault();
            return;
        }
    
        if(e.deltaY > 0 && this.last_index < (this.number_sections()-1) ){
            this.navigate_to(this.last_index+1+1)
        }else if(e.deltaY < 0 && this.last_index > 0){
            this.navigate_to(this.last_index-1+1)
        }
    
        this.lastAnimation = this.timeNow;
    }

    this.create_pagination();
    this.select_current_pagination(0);
    this.navigate_to(1);

    document.addEventListener('wheel', this.window_scroll_action);

    return this;
}