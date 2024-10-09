import csv
import random
from datetime import datetime, timedelta
import json
import os.path
import pymongo
import subprocess

# Generate data for 50 characters
NUM_ROWS = 1000

# Create the CSV file
OUTPUT_FILE = "directory.csv"

fnames = [
    "John", "James", "Harry", "Leslie", "Amanda", "Emma", "Liam", "Olivia", "Noah", "Ava",
    "Oliver", "Sophia", "Elijah", "Isabella", "Lucas", "Mia", "Mason", "Amelia", "Ethan", "Harper",
    "Aiden", "Evelyn", "Jackson", "Abigail", "Logan", "Ella", "Scarlett", "Ben", "Grace", 
    "Jacob", "Chloe", "Micheal", "Aria", "Daniel", "Lily", "Henry", "Zoey", "Alexander", "Layla", 
    "William", "Stella", "Matt", "Nora" "Joe", "Hazel", "Sam", "Natalie", "David", "Leah", "Carter",
    "Ellie", "Owen", "Violet", "Wyatt", "Morgana", "Kayle", "Anthony", "Dylan", "Lucy", "Anna", "Luke",
    "Belle", "Skylar", "Sophie", "Chris", "Andy", "Ruby", "Aqua", "Thomas", "Maddy", "Lillia", "Autumn", 
    "Elias", "Vin", "Peyton", "Isaiah", "Hector", "Raelynn", "Quinn", "Robert", "Clara", "Richard"
]

lnames = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson", "Clark", 
    "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", 
    "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Mitchell", "Perez", 
    "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", 
    "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Murphy", "Bailey", "Rivera", "Cooper", "Richardson", 
    "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez", "Watson", "Brooks", "Kelly", 
    "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross", "Henderson", "Coleman", "Jenkins", 
    "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington", "Butler", "Simmons", 
]

roles = [
    "Software Engineer", "Data Scientist", "Product Manager", "UX/UI Designer", "Project Manager", 
    "Business Analyst", "Systems Administrator", "Network Engineer", "Web Developer", 
    "Database Administrator", "DevOps Engineer", "Marketing Manager", "Sales Representative", 
    "Customer Support Specialist", "Graphic Designer", "Content Writer", "Human Resources Manager", 
    "Accountant", "Financial Analyst", "Operations Manager", "Research Scientist", 
    "Quality Assurance Tester", "Digital Marketing Specialist", "SEO Analyst", 
    "Content Strategist", "Social Media Manager", "Training and Development Manager", 
    "Legal Advisor", "Technical Support Specialist", "Pharmaceutical Sales Representative", 
    "Supply Chain Analyst", "Business Development Manager", "Event Planner", 
    "Public Relations Specialist", "Recruitment Consultant", "Software Tester", "IT Consultant", 
    "Systems Analyst", "Cloud Solutions Architect", "Mobile App Developer", "Hardware Engineer", 
    "Compliance Officer", "Insurance Underwriter", "Market Research Analyst", "Editorial Assistant", 
    "Corporate Trainer", "E-commerce Specialist", "Retail Manager", "Facilities Manager", "HR" 
]

cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", 
    "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", 
    "San Francisco", "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington D.C."
]

# id, name, phone, role, location, salary, manager
data_rows = []
names = set()
employees = []
numbers = set()
for i in range(1, NUM_ROWS + 1):
    id = i
    while len(names) < i:
        name = random.choice(fnames) + " " + random.choice(lnames)
        names.add(name)
    employees.append(name)
    while len(numbers) < i:
        first = random.randint(100, 999)
        mid = random.randint(100, 999)  
        last = random.randint(1000, 9999)  
        phone =  f"{first}-{mid}-{last}"
        numbers.add(phone)
    role = random.choice(roles)
    location = random.choice(cities)
    salary = random.randint(10000, 140000)
    if i != 1:
        manager = random.choice(employees)
    else:
        manager = "none"
    data_row = [
        id,
        name,
        phone,
        role,
        location,
        salary,
        manager
    ]
    data_rows.append(data_row)

populated = False
if os.path.exists(OUTPUT_FILE):
    populated = True
    os.remove(OUTPUT_FILE)
    with open(OUTPUT_FILE, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["id", "name", "phone", "role", "location", "salary", "manager"])
        writer.writerows(data_rows)
    
else:
    with open(OUTPUT_FILE, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["id", "name", "phone", "role", "location", "salary", "manager"])
        writer.writerows(data_rows)

json_data = []
with open(OUTPUT_FILE, 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        json_data.append(row)
with open("directory.json", 'w', encoding='utf-8') as json_file:
    json.dump(json_data, json_file, indent=4)

client = pymongo.MongoClient('localhost', 27017)
db = client['directory']
collection = db['employees']
if 'employees' in db.list_collection_names():
        db.drop_collection('employees')
with open("directory.json", 'r', encoding='utf-8') as file:
        data = json.load(file)
if isinstance(data, list):
    collection.insert_many(data)
else:
    collection.insert_one(data)
print("Sucessfully populated database")