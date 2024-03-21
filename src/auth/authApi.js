export function createUser(data) {
    const { name, email, password, location } = data;
  
    return new Promise((resolve, reject) => {
      fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, location, password })
      })
      .then(response => {
        if (response.status==200) {
          resolve(response.json());
        } else if (response.status == 400) {
          reject(new Error("User already exists"));
        } else {
          reject(new Error("Unexpected error occurred"));
        }
      })
      .catch(error => {
        reject(new Error('An error occurred while creating the user: ' + error.message));
      });
    });
  }
export function checkUser(data) {
    const {  email, password } = data;
  
    return new Promise((resolve, reject) => {
      fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => {
        if (response.status==200) {
          // console.log(response.json())
          resolve(response.json());
        } else if (response.status == 404) {
          reject(new Error("User doesNot exist"));
        } 
        else if (response.status == 500) {
          reject(new Error("Login with valid credential"));
        } 
        else {
          reject(new Error("Unexpected error occurred"));
        }
      })
      .catch(error => {
        reject(new Error('An error occurred while logged In: ' + error.message));
      });
    });
  }


  export function getUser() {
    
  
    return new Promise((resolve, reject) => {
       fetch('http://localhost:5000/auth/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',

            'auth-token': localStorage.getItem('token'),
          },
        })
      .then(response => {
        if (response.status==200) {
          // console.log(response.json())
          resolve(response.json());
        } else if (response.status == 404) {
          reject(new Error("Some error"));
        } 
        
        else {
          reject(new Error("Unexpected error occurred"));
        }
      })
      .catch(error => {
        reject(new Error('An error occurred while logged In: ' + error.message));
      });
    });
  }



  