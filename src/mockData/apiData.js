export const getListRole = {
  "status": "Success",
  "message": "You have successfully",
  "data": [
    {
      "_id": "65605b22760a95942302cadd",
      "identify": 4,
      "name": "Employee"
    },
    {
      "_id": "65605b56760a95942302cadf",
      "identify": 4,
      "name": "Team Leader"
    },
    {
      "_id": "65605b77760a95942302cae1",
      "identify": 4,
      "name": "Dresser"
    },
    {
      "_id": "65605b7d760a95942302cae3",
      "identify": 4,
      "name": "Stylist"
    },
    {
      "_id": "65605b9c760a95942302cae5",
      "identify": 4,
      "name": "Servants"
    },
    {
      "_id": "65605baf760a95942302cae7",
      "identify": 4,
      "name": "MC"
    },
    {
      "_id": "65605bbc760a95942302cae9",
      "identify": 4,
      "name": "Driver"
    },
    {
      "_id": "65605bd6760a95942302caeb",
      "identify": 4,
      "name": "Technician"
    }
  ]
}

export const getEmployeeProfile = {
  "status": "Success",
  "message": "You have successfully",
  "data": {
      "employee": {
          "_id": "65659e015a050298fd29972c",
          "auth": {
              "_id": "6565950c5a050298fd299685",
              "username": "trongdgpd06965@fpt.edu.vn",
              "role": {
                  "_id": "65605b22760a95942302cadd",
                  "name": "Employee"
              }
          },
          "contract": null,
          "email": "trongdgpd06965@fpt.edu.vn",
          "fullName": "Đoàn Gia Trọng",
          "dateOfBirth": "1995-02-26T00:00:00.000Z",
          "phoneNumber": "0353088031",
          "avatar": null
      }
  }
} 

export const employeeProfileResponse = {
  "status": "Success",
  "message": "You have successfully",
  "data": {
    "employee": {
      "_id": "65659e015a050298fd29972c",
      "auth": {
        "_id": "6565950c5a050298fd299685",
        "username": "trongdgpd06965@fpt.edu.vn",
        "role": {
          "_id": "65605b22760a95942302cadd",
          "name": "Employee"
        }
      },
      "contract": null,
      "email": "trongdgpd06965@fpt.edu.vn",
      "fullName": "Đoàn Gia Trọng",
      "dateOfBirth": "1995-02-26T00:00:00.000Z",
      "phoneNumber": "0353088031",
      "avatar": null
    }
  }
};

export const eventsListResponse = {
  "status": "Success",
  "message": "You have successfully",
  "data": {
    "listEvent": [
      {
        "_id": "656ebb2fa5eb9f2856f611cc",
        "name": "Khai trương của hàng",
        "services": [
          {
            "_id": "123",
            "name": "abc",
          },
          {
            "_id": "123",
            "name": "abc",
          }
        ],
        "employees": [
          {
            "_id": "123",
            "name": "abc",
            "image": "https://example.com"
          },
          {
            "_id": "123",
            "name": "abc",
            "image": "https://example.com"
          }
        ],
        "timelines": [],
        "equipments": [],
        "dateTime": "2023-11-11T06:48:25.462Z",
        "attachments": [],
        "images": []
      }
    ],
    "totalEvent": 1
  }
};