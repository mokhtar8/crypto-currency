

var btn = document.getElementById('add-btn');
var inputTask = document.getElementById('crypto-input');
var selectTag = document.getElementById('airdrapsec');
var resultDiv = document.getElementById('result');



  btn.addEventListener('click', function () {
var selectedId = selectTag.value;
fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${selectedId}&vs_currencies=usd`)
    .then(res => res.json())
    .then(data => {
      /////////////////////////اضافه کردن فرایند ////////////////////////////
            
    if (inputTask.value == '') {
        alert('please enter a number');
    } else {
        if (data[selectedId]) {
            var inputVal = inputTask.value;
            var price = data[selectedId].usd;
            var arzeshNhaii = (price * inputVal).toFixed(2);
console.log(selectedId);

  var newDiv = document.createElement('div');
            newDiv.classList.add('newDiv');
            newDiv.innerHTML =` <span>${selectedId}<br><br> تعداد توکن :${inputTask.value} <br><br>  قیمت توکن :${arzeshNhaii} <br><br>  ارزش فعلی :${price}</span>`;

            resultDiv.appendChild(newDiv);
            var deBtn = document.createElement('button');
            deBtn.innerHTML = 'حذف کردن';
              deBtn.classList.add('deletBtn');
            newDiv.appendChild(deBtn);

            var editBtn = document.createElement('button');
            editBtn.innerHTML = 'ویرایش';
            editBtn.classList.add('editBtn');
            newDiv.appendChild(editBtn);

          

            inputTask.value = "";
            setData();
        } else {
            alert(`${selectedId}: اطلاعاتی موجود نیست`);
        }
    }
/////////////////////// فرایند ویرایش///////////////////////////
    editBtn.addEventListener('click', () => {
        inputTask.value = inputVal; 
        selectTag.value = selectedId; 
        resultDiv.removeChild(newDiv); 
       
        setData();
    });
/////////////////////// فرایند حذف///////////////////////////

    deBtn.addEventListener('click', () => {
        resultDiv.removeChild(newDiv)
        setData()
    })
        })

            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });

//////////////لوکال استورج//////////////////
function getData() {
    resultDiv.innerHTML = JSON.parse(localStorage.getItem('data'));
    var nedi = document.querySelectorAll('.newDiv');
    
    var edit = document.querySelectorAll('.editBtn');
   edit .forEach(e => {
   e .addEventListener('click', () => {
    inputTask.value = inputVal; 
    selectTag.value = selectedId; 
    resultDiv.removeChild(newDiv); 
        setData();
    });   });


    var deletBtn = document.querySelectorAll('.deletBtn');
    deletBtn.forEach(e => {

        e.addEventListener('click', () => {
            resultDiv.removeChild(nedi);
            resultDiv.removeChild(deletBtn);
            resultDiv.removeChild(editBtn);
            setData();

        });
    })
}
    getData()

function setData() {
    localStorage.setItem("data", JSON.stringify(resultDiv.innerHTML));
}

