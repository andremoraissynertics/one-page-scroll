function OnePageScroll (interval){
    this.interval=interval;

    this.last_index=0;

    this.is_mobile = (window.outerWidth < 767) ? true : false

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

        // check if the user is using a mobile device or is in desktop view
        if (this.is_mobile){
            let pagination_button_up = document.createElement("div");
            $(pagination_button_up).click(()=>this.move_up())

            let pagination_button_down = document.createElement("div");
            $(pagination_button_down).click(()=>this.move_down())

            $("body pagination").append(pagination_button_up, pagination_button_down)
        }else{
            for(let i=0; i<this.number_sections(); i++){
                let new_pagination_button = document.createElement("div")
                new_pagination_button.dataset.page=i
                $(new_pagination_button).click(()=>navigate_to(i+1))
        
                $("body pagination").append(new_pagination_button)
            }
        }
        
    }

    this.select_current_pagination = () => {
        $("pagination div").removeClass("active");
        
        if(!this.is_mobile)
            $(`pagination div:eq(${this.last_index})`).addClass("active")
    }

    this.navigate_to = (page_number) => {
        this.last_index=page_number-1; 
        select_current_pagination()

        $('html, body').animate({
            scrollTop: window.innerHeight*(page_number-1)
        }, { 
            duration:this.interval
        });
    }

    this.move_down = () =>{
        if(this.last_index<this.number_sections()-1){
            this.navigate_to(this.last_index+2); // +2 because last index starts at zero and the page number starts at 1
        }

        if(this.is_mobile)
            $(`pagination div:eq(1)`).addClass("active")
    }

    this.move_up = () =>{
        if(this.last_index>0){
            this.navigate_to(this.last_index); // this.last_index because the method navigate_to will subtract 1 to the choosen page
        }

        if(this.is_mobile)
            $(`pagination div:eq(0)`).addClass("active")
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

    this.handle_window_change = (e) => {
        this.is_mobile = (window.outerWidth < 767) ? true : false;

        this.sections = document.querySelectorAll("section");

        this.sections.forEach((s,i) => {
            s.style.top=`calc(100vh * ${i})`
        });

        $("pagination").remove()
        this.create_pagination();

        this.select_current_pagination();

        this.navigate_to(this.last_index+1);
    } 

    this.create_pagination();
    this.select_current_pagination();
    this.navigate_to(1);

    document.addEventListener('wheel', this.window_scroll_action);
    window.addEventListener('resize', this.handle_window_change);

    return this;
}