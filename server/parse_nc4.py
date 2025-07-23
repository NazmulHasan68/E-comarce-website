import sys
import json
from netCDF4 import Dataset

file_path = sys.argv[1]  # Command line থেকে ফাইল পাথ নেওয়া
ds = Dataset(file_path, 'r')  # NetCDF ফাইল read

variables = list(ds.variables.keys())  # ভ্যারিয়েবল গুলোর নাম নিচ্ছি

print(json.dumps({  # JSON আউটপুট হিসেবে প্রিন্ট
    "variables": variables
}))
