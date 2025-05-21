from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from loan_app.models import LoanLead
import time
import random
import uuid
import re
import requests

class LoadAPI(APIView):
    def get(self, request):
        # Logic for GET request
        return Response({"message": "GET request successful"}, status=status.HTTP_200_OK)

    def post(self, request):
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        email = request.data.get('email')
        phone = request.data.get('phone')
        loan_amount = request.data.get('loanAmount')
        zip_code = request.data.get('zipCode')
        
        if not first_name or not last_name or not email or not phone or not loan_amount or not zip_code:
            return Response({"message": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not re.match(r"^.{1,99}$", first_name):
            return Response({"message": "First name must be less than 100 characters"}, status=status.HTTP_400_BAD_REQUEST)
        if not re.match(r"^.{1,99}$", last_name):
            return Response({"message": "Last name must be less than 100 characters"}, status=status.HTTP_400_BAD_REQUEST)
        if not re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email):
            return Response({"message": "Invalid email address"}, status=status.HTTP_400_BAD_REQUEST)
        if not re.match(r"^\d{10}$", phone):
            return Response({"message": "Phone must be less than 100 characters"}, status=status.HTTP_400_BAD_REQUEST)
        
        if not isinstance(loan_amount, (int, float)) or loan_amount <= 0:
            return Response({"message": "Loan amount must be a numeric value greater than zero"}, status=status.HTTP_400_BAD_REQUEST)
        

        if not zip_code:
            return Response({"message": "Zip code is required"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            response = requests.get(f"https://api.postalpincode.in/pincode/{zip_code}", verify=False)
            print(response)
            if response.status_code != 200:
                return Response({"message": "Invalid zip code"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                data = response.json()
                print(data)



        lead_id = f"{int(time.time())}{random.randint(1000, 9999)}"
        if loan_amount > 10000 or loan_amount < 100000:
            lead_id = uuid.uuid4()
        LoanLead.objects.create(
            lead_id=lead_id,
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone=phone,
            loan_amount=loan_amount,
            zip_code=zip_code
        )
        return Response({"message": "POST request successful", "lead_id": lead_id}, status=status.HTTP_201_CREATED)