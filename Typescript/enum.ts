enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let move: Direction = Direction.Up;
console.log(move); // 0
move = Direction.Down;
console.log(move);
enum StatusCode {
  Success = 200,
  NotFound = 404,
  serverError = 500,
}
console.log(StatusCode.Success); // 200
enum Role {
  Admin,
  User,
  Guest,
}

console.log(Role.Admin); // 0
console.log(Role[0]); // "Admin"
// enum Status {
//   Active = "ACTIVE",
//   Inactive = "INACTIVE",
// }
// console.log(Status.Active);

// console.log(Status[0]);
enum OrderStatus {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

let Status: OrderStatus = OrderStatus.Pending;
console.log(Status); // "PENDING"
Status = OrderStatus.Approved;
console.log(Status); // "APPROVED"
