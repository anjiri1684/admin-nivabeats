import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Spinner from "../components/Spinner";

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axios.get(
          "https://niva-beats-backend.vercel.app/api/admin/customers",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        console.log(data);

        // Ensure the response data is an array
        setCustomers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">Customers</h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">First Name</th>
                <th className="py-3 px-6">Last Name</th>
                <th className="py-3 px-6">State</th>
                <th className="py-3 px-6">City</th>
                <th className="py-3 px-6">Country</th>
                <th className="py-3 px-6">Subscribed</th>
                <th className="py-3 px-6">Age</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(customers) && customers.length > 0 ? (
                customers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {customer.email}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {customer.firstName}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {customer.lastName}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {customer.state}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {customer.city}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {customer.country}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {customer.subscribed ? "Yes" : "No"}
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {customer.age}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="py-4 px-6 text-center text-gray-900 dark:text-white"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
