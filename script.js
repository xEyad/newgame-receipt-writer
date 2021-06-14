games = [
    {name:'Spyfall',price:250,quantity:null},
    {name:'Didi asks',price:350,quantity:null},
    {name:'Wonder cards',price:390,quantity:null},
    {name:'Sling puck',price:100,quantity:null},
    {name:'Summer scout',price:150,quantity:null},
    {name:'Abdo vs zombie',price:150,quantity:null},
]

deliveryAreas = [    
    {
        name: "Cairo",
        fees: 45
    },
    {
        name: "tanta",
        fees: 65
    },
    {
        name: "tagmo3",
        fees: 45
    },
    {
        name: "suiz",
        fees: 65
    },
    {
        name: "sohag",
        fees: 75
    },
    {
        name: "smouha",
        fees: 55
    },
    {
        name: "shrqiya",
        fees: 65
    },
    {
        name: "shoubra",
        fees: 45
    },
    {
        name: "sheikh zayed",
        fees: 45
    },
    {
        name: "sedy bshr",
        fees: 55
    },
    {
        name: "rehab",
        fees: 45
    },
    {
        name: "ramsis",
        fees: 45
    },
    {
        name: "qlubiya",
        fees: 65
    },
    {
        name: "qena",
        fees: 75
    },
    {
        name: "por saied",
        fees: 65
    },
    {
        name: "nasr city",
        fees: 45
    },
    {
        name: "mokatm",
        fees: 45
    },
    {
        name: "mohandseen",
        fees: 45
    },
    {
        name: "menofiya",
        fees: 65
    },
    {
        name: "menia",
        fees: 75
    },
    {
        name: "masr el gdeda",
        fees: 45
    },
    {
        name: "mansoura",
        fees: 65
    },
    {
        name: "madenty",
        fees: 45
    },
    {
        name: "luxur",
        fees: 75
    },
    {
        name: "khatmiya",
        fees: 45
    },
    {
        name: "kafr elsheikh",
        fees: 65
    },
    {
        name: "ismaliya",
        fees: 65
    },
    {
        name: "imbaba",
        fees: 45
    },
    {
        name: "helioplis",
        fees: 45
    },
    {
        name: "haram",
        fees: 45
    },
    {
        name: "Giza",
        fees: 45
    },
    {
        name: "gharbiya",
        fees: 65
    },
    {
        name: "garden city",
        fees: 45
    },
    {
        name: "fayuom",
        fees: 75
    },
    {
        name: "faisal",
        fees: 45
    },
    {
        name: "elshrouk",
        fees: 45
    },
    {
        name: "doun town",
        fees: 45
    },
    {
        name: "dokki",
        fees: 45
    },
    {
        name: "damitta",
        fees: 65
    },
    {
        name: "dakhliya",
        fees: 65
    },
    {
        name: "borg el arab",
        fees: 55
    },
    {
        name: "bolaq el dakrour",
        fees: 45
    },
    {
        name: "bhiyra",
        fees: 65
    },
    {
        name: "bani suief",
        fees: 75
    },
    {
        name: "badr city",
        fees: 45
    },
    {
        name: "aswan",
        fees: 75
    },
    {
        name: "asuiet",
        fees: 75
    },
    {
        name: "amria",
        fees: 55
    },
    {
        name: "alx",
        fees: 55
    },
    {
        name: "ain sokhna",
        fees: 65
    },
    {
        name: "ain shams",
        fees: 45
    },
    {
        name: "agouza",
        fees: 45
    },
    {
        name: "agamy",
        fees: 55
    },
    {
        name: "6-Oct",
        fees: 45
    },
    {
        name: "10th of ramdan",
        fees: 45
    }
]

$(document).ready(function()
{
  
    for (let i = 0; i < deliveryAreas.length; i++) {
        const area = deliveryAreas[i];
        if(i==0)
            $(`<option selected value="${area.fees}">${area.name} (${area.fees} EGP)</option>`).appendTo('#deliverySelect');
        else
            $(`<option value="${area.fees}">${area.name}  (${area.fees} EGP)</option>`).appendTo('#deliverySelect');
    }

    for (let i = 0; i < games.length; i++) 
    {
        var game = games[i];
        $(`
            <div class="row my-3">
                <div class="col-4" >
                    <input type="text" class="form-control" id="name${i}" value="${game.name}">
                </div>
                <div class="col-4" >
                    <input type="text" class="form-control" id="price${i}" value="${game.price}">
                </div>
                <div class="col-4" >
                    <input type="number" class="form-control" id="quantity${i}" value="${game.quantity}">                
                </div>
            </div>
        `).insertBefore('#delivery')

        $(`#name${i}`).on('keyup change',function() {
            console.log(`${games[i].name} changed. value ${this.value}`);
            games[i].name = this.value;
            updateReceipt();
        });
        $(`#price${i}`).on('keyup change',function() {
            console.log(`${games[i].name} changed. value ${this.value}`);
            games[i].price = Number(this.value);
            updateReceipt();
        });
        $(`#quantity${i}`).on('keyup change',function() {
            console.log(`${games[i].name} changed. value ${this.value}`);
            games[i].quantity = Number(this.value);
            updateReceipt();
        });
    }   

    updateReceipt(); 

    //init listeners
    $(`#deliverySelect`).on('change',function() {
        updateReceipt();
    });

    $(`#copyBtn`).on('click',function() {
        copyReceipt();
    });


}); 

function updateReceipt() {
    var total = 0;
    $('#order').html('');
    for (let i = 0; i < games.length; i++) 
    {
        var game = games[i];        
        if(game.quantity<=0 || !game.quantity)    
            continue;
        const price = game.price*game.quantity;
        $(`
            <p>${game.name} x ${game.quantity} = ${price} EGP</p>
        `).appendTo('#order');     
        total += price;   
    }
    const delivery = Number($('#deliverySelect').val());
    $(`<p>Delivery = ${delivery} EGP</p>`).appendTo('#order');
    $(`<p><bold>Total = ${total + delivery} EGP</bold></p>`).appendTo('#order');
}

function copyReceipt() {
    containerid = 'receiptContainer';
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select().createTextRange();
        document.execCommand("copy");
      } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().addRange(range);
        document.execCommand("copy");
      }
}