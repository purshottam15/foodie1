export function deletefood(id) {


  return new Promise((resolve, reject) => {

    fetch(`http://localhost:5000/auth/deletefoodcart/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    }).then(response => {
      if (response.status == 200) {

        resolve(response.json());
      } else if (response.status == 404) {
        reject(new Error("Some error"));
      }

      else {
        reject(new Error("Unexpected error occurred"));
      }
    })


  });
}
export function updatecart(id,newQuantity) {


  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/auth/updatefoodcart/${id}`, {
      method: 'PUT',
      headers: {
          "Content-Type": "application/json",
          'auth-token': localStorage.getItem('token')


      },
      
      body: JSON.stringify({ quantity: newQuantity })
  }).then(response => {
      if (response.status == 200) {

        resolve(response.json());
      } else if (response.status == 404) {
        reject(new Error("Some error"));
      }

      else {
        reject(new Error("Unexpected error occurred"));
      }
    })


  });
}
export function fetchcart() {


  return new Promise((resolve, reject) => {
    fetch('http://localhost:5000/auth/foodcart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            }).then(response => {
      if (response.status == 200) {

        resolve(response.json());
      } else if (response.status == 404) {
        reject(new Error("Some error"));
      }

      else {
        reject(new Error("Unexpected error occurred"));
      }
    })


  });
}
export function clearcart() {


  return new Promise((resolve, reject) => {
    fetch(`http://localhost:5000/auth/clearfoodcart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      }).then(response => {
      if (response.status == 200) {

        resolve(response.json());
      } else if (response.status == 404) {
        reject(new Error("Some error"));
      }

      else {
        reject(new Error("Unexpected error occurred"));
      }
    })


  });
}
export function placeOrder(data) {
  const {food,modeofpayment,address}=data;


  return new Promise((resolve, reject) => {
    fetch('http://localhost:5000/auth/giveorder', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({food,modeofpayment,address}),
    }).then(response => {
      if (response.status == 200) {

        resolve(response.json());
      } else if (response.status == 401) {
        reject(new Error("Some error"));
      }

      else {
        reject(new Error("Unexpected error occurred"));
      }
    })


  });
}






