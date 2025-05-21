"use client"
import { useState } from "react";
import axios from "axios";
import { config } from "../config";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<"screen1" | "screen2">("screen1");
  const [userData, setUserData] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loanData, setLoanData] = useState<{
    loanAmount: number;
    zipCode: number | null;
  }>({
    loanAmount: 0,
    zipCode: null,
  });

  const handleUserDataChange = (field: keyof typeof userData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoanDataChange = (field: keyof typeof loanData, value: number) => {
    setLoanData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {

    if (!userData.firstName || !userData.lastName || !userData.email || !userData.phone || loanData.loanAmount <= 0 || loanData.zipCode === null) {
      window.alert("All fields are required");
      return;
    }

    if (userData.firstName.length > 100) {
      window.alert("First name must be less than 100 characters");
      return;
    }
    if (userData.lastName.length > 100) {
      window.alert("Last name must be less than 100 characters");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(userData.email)) {
      window.alert("Invalid email address");
      return;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(userData.phone)) {
      window.alert("Phone must be a 10-digit number");
      return;
    }

    if (typeof loanData.loanAmount !== 'number' || loanData.loanAmount <= 0) {
      window.alert("Loan amount must be a numeric value greater than zero");
      return;
    }
    const res = await axios.post(`${config.bakcendApiBase}/loan-api/`, {
      ...userData,
      ...loanData,
    })
    console.log("res", res)
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{10}$/;

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setCurrentScreen("screen1")}
          className={`px-4 py-2 rounded-lg ${currentScreen === "screen1"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Personal Information
        </button>
        <button
          onClick={() => setCurrentScreen("screen2")}
          className={`px-4 py-2 rounded-lg ${currentScreen === "screen2"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700"
            }`}
        >
          Loan Details
        </button>
      </div>



      {/* Screen 1: Personal Information */}
      {currentScreen === "screen1" && (
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Personal Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={userData.firstName}
                onChange={(e) => handleUserDataChange("firstName", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm">{userData.firstName.length > 100 && "First name must be less than 100 characters"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={userData.lastName}
                onChange={(e) => handleUserDataChange("lastName", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm">{userData.lastName.length > 100 && "Last name must be less than 100 characters"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => handleUserDataChange("email", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm">{userData.email && !emailRegex.test(userData.email) && "Invalid email address"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) => handleUserDataChange("phone", e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm">{userData.phone && !phoneRegex.test(userData.phone) && "Phone must be a 10-digit number"}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setCurrentScreen("screen2")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screen 2: Loan Details */}
      {currentScreen === "screen2" && (
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Loan Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
              <input
                type="number"
                value={loanData.loanAmount}
                onChange={(e) => handleLoanDataChange("loanAmount", Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm">{loanData.loanAmount && loanData.loanAmount < 0 && loanData.loanAmount !== 0 && "Loan amount must be a numeric value greater than zero"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input
                type="number"
                value={loanData.zipCode || ""}
                onChange={(e) => handleLoanDataChange("zipCode", Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="text-red-500 text-sm">{loanData.zipCode && loanData.zipCode.toString().length < 4 && "Zip code must be 4-6 digits"}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setCurrentScreen("screen1")}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
