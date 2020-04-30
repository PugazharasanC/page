var body = document.getElementsByTagName('body')[0];
var numOfval = parseInt(document.getElementById('num').value);
var numOfPage = Math.ceil(mainObj.length / numOfval);
var curPage = 0;
var prePage = 0;
var fixSize = () => {
    numOfval = parseInt(document.getElementById('num').value);
    numOfPage = Math.ceil(mainObj.length / numOfval);
    mainDriverFunc();
}
var tableBodyCreation = () => {
    var tableBody = document.createElement('tbody');
    tableBody.classList.add('table');
    for (var itr = 0; itr < numOfval; itr++) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.id = 'id' + itr;
        tr.appendChild(td);
        td = document.createElement('td');
        td.id = 'name' + itr;
        tr.appendChild(td);
        td = document.createElement('td');
        td.id = 'mail' + itr;
        tr.appendChild(td);
        tableBody.appendChild(tr);
    }
    return tableBody;
}
var tableHeadCreation = () => {
    var tableHead = document.createElement('thead');
    tableHead.className = 'thead-light';
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.innerHTML = 'Id'
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Name';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerHTML = 'Mail ID';
    tr.appendChild(th);
    tableHead.appendChild(tr);
    return tableHead;
}
var tableCreation = () =>{
    var table = document.createElement('table');
    table.classList.add('table');
    table.classList.add('table-striped');
    table.classList.add('table-hover');
    table.appendChild(tableHeadCreation());
    table.appendChild(tableBodyCreation());
    return table;
}

var buttonCreation = () => {
    var anotherDiv = document.createElement('div');
    var button = document.createElement('button');
    button.id = 'prevButton';
    button.classList.add('btn');
    button.classList.add('btn-light');
    button.onclick = prevPage;
    button.innerHTML = 'Previous';
    anotherDiv.appendChild(button);
    for (var itr = 0; itr < numOfPage; itr++) {
        button = document.createElement('button');
        button.id = itr + 1 + '';
        button.classList.add('btn');
        button.classList.add('btn-light');
        button.setAttribute('onclick', 'movePage(' + (itr + 1) + ')');
        button.innerHTML = itr + 1 + '';
        anotherDiv.appendChild(button);
    }
    button = document.createElement('button');
    button.id = 'nextButton';
    button.classList.add('btn');
    button.classList.add('btn-light');
    button.onclick = nextPage;
    button.innerHTML = 'Next';
    anotherDiv.appendChild(button);
    return anotherDiv;
}
var mainDriverFunc = () => {
    var myDiv = document.getElementById('myDiv');
    if (myDiv != null) {
        body.removeChild(myDiv);
    }
    newDiv = document.createElement('div');
    newDiv.id = 'myDiv';
    body.className = 'container';
    newDiv.appendChild(tableCreation());
    newDiv.appendChild(buttonCreation());
    body.appendChild(newDiv);
    movePage('1');
}
var nextPage = () => {
    if (curPage != numOfPage) {
        movePage(curPage + 1);
    }
}
var prevPage = () => {
    if (curPage != 1) {
        movePage(curPage - 1);
    }
}
var movePage = (page) => {
    page = parseInt(page);
    var start = (page - 1) * numOfval;
    var end = page * numOfval;
    var itr;
    for (itr = start; itr < end && itr < mainObj.length; itr++) {
        document.getElementById('id' + (itr - start)).innerHTML = mainObj[itr].id;
        document.getElementById('mail' + (itr - start)).innerHTML = mainObj[itr].email;
        document.getElementById('name' + (itr - start)).innerHTML = mainObj[itr].name;
    }
    if (itr < end) {
        for (itr; itr < end; itr++) {
            document.getElementById("id" + (itr - start)).innerHTML = '';
            document.getElementById("mail" + (itr - start)).innerHTML = '';
            document.getElementById("name" + (itr - start)).innerHTML = '';
        }
    }
    prePage = curPage;
    curPage = page;
    if (prePage != 0) {
        document.getElementById('' + prePage).classList.remove('btn-primary');
        document.getElementById('' + prePage).classList.add('btn-light');
    }
    document.getElementById('' + curPage).classList.add('btn-primary');
    document.getElementById('' + curPage).classList.remove('btn-light');
}
window.onload = mainDriverFunc;