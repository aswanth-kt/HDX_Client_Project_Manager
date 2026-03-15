
export const handleStatusStyle = (status) => {
  switch (status) {

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "In Progress":
      return "bg-blue-100 text-blue-700";

    case "Completed":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700"
  }
};