class Pagination {
    constructor() {
        this.self = document.createElement('ul');
        this.self.classList.add('controls');
        this.controls = [];
        this.empty = true;
        this.firstControl = 0;
        this.lastControl = 0;
        this.currentControl = 0;
    }
    addControls(amount) {
        const temp = document.createDocumentFragment();
        for(let i = 1; i <= amount; i++){
            const li = document.createElement('li');
            const a = document.createElement('a');
            li.append(a);
            a.innerText = i;
            a.setAttribute('data-index', i - 1);
            temp.append(li);
            this.controls.push(a);
        }
        this.self.append(temp);
        this.empty = false;
        this.firstControl = this.controls[0];
        this.lastControl = this.controls[amount - 1];
    }
}

export default Pagination;