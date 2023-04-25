# student-managment

- clone the project 
- execute "npm i"
- execute the application by "npm start"
(after this server will start listening to particular port)


so iam gonna list the apis & the payload you should be using , though from project mvc structure the person will be able deduce the payload & apis , but for users ease & understing here :-


## Register POST(http://localhost:port/student/)
- payload:-
```yaml
{
        "firstName": "sainath",
        "lastName": "reddy",
        "schoolName": "kendriya vidyalaya",
        "email": "sainath@god.com",
        "mobile": "8826474783",
        "password": "sai@1234",
        "photoPath": "D:/wall/GOKU/blue.jpg"
       
    }
    ```
  ## Login POST(http://localhost:port/student/login)
  - payload:-
```yaml
{
    "mobile":8826474781,
    "password": "god@1234"
}```


  - response:-
```yaml
{
    "status": true,
    "message": "User login successfull",
    "data": {
        "userId": "6446e99f2cec35903280c116",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ2ZTk5ZjJjZWMzNTkwMzI4MGMxMTYiLCJpYXQiOjE2ODI0MDIxMDEsImV4cCI6MTY4MjQ2MjEwMX0.Vffmhs0HyHYgNLihzUlBbnajngoaRBjIyMq91zXw6WU"
    }```
}```

## CreateAssignment POST(http://localhost:port/assignment/)
    - payload:-
```yaml
{

        "title": "String",
        "description": "String",
        "filetype": "PDF",
        "filepath": "/Users/P.V.SAINATH REDDY/Downloads/noderannlabs.pdf" ,
        "students": [
            "6446e05b08ca367dd2f88da7",
            "6446e17b58fe9d652fb3491b"
        ]

}```
    
    



