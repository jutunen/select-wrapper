
class Selectwrapper extends HTMLElement {
    constructor() {
        super()
        this.maxItemsPerPage = 5;
        this.page = 1;
        this.options = [];
    }

    static get observedAttributes() {
        return []
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldValue, newValue) {
    }

    connectedCallback() {
        setTimeout(() => { this.init() }, 0) // https://stackoverflow.com/questions/58676021/accessing-custom-elements-child-element-without-using-slots-shadow-dom
    }

    init() {
        this.selectElement = this.querySelector('select')
        this._setOptions();

    }

    _setOptions() {
        if (this.selectElement === null || this.options.length === 0) {
            return
        }

        // clear current options first:
        this.selectElement.innerHTML = '';

        let pageCount = Math.ceil(this.options.length / this.maxItemsPerPage);
        //console.log("pageCount: " + pageCount);

        let optionsSlice;
        if (pageCount > 1) {
            let start = (this.page - 1) * this.maxItemsPerPage;
            let end = start + this.maxItemsPerPage;
            optionsSlice = this.options.slice(start, end);
        } else {
            optionsSlice = this.options;
        }

        //console.log("page: " + this.page);  
        //console.log("maxItemsPerPage: " + this.maxItemsPerPage);  

        let limit;

        if (pageCount === 1) {
            limit = this.options.length;
        } else if (this.page === pageCount) {
            //console.log("this.options.length: ");
            //console.log(this.options.length);
            //console.log("this.maxItemsPerPage * (this.pageCount - 1): ");
            //console.log(this.maxItemsPerPage * (pageCount - 1));
            limit = this.options.length - (this.maxItemsPerPage * (pageCount - 1));
        } else {
            limit = this.maxItemsPerPage;
        }
        //console.log("limit: " + limit);        

        for (let i = 0; i < limit; i++) {
            let opt = document.createElement('option');
            //console.log("i: " + i);
            opt.value = optionsSlice[i].value;
            opt.innerHTML = optionsSlice[i].name;
            this.selectElement.appendChild(opt);
        }
    }

    nextPage() {
        let pageCount = Math.ceil(this.options.length / this.maxItemsPerPage);
        if (this.page === pageCount || !pageCount) return;
        this.page++;
        this._setOptions();
    }

    prevPage() {
        if (this.page === 1) return;
        this.page--;
        this._setOptions();
    }

}

customElements.define('select-wrapper', Selectwrapper)
