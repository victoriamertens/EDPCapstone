import csv
import random
import json
import os.path
import pymongo
import string
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches

#LOOKUP HOW TO INCREASE ACCURACY OF LINEARREGRESSION MODEL

# Generate data for 50 characters
NUM_ROWS = 6000

# Create the CSV file
OUTPUT_FILE = "directory.csv"

class Role:
    def __init__(self, name: str, focus: str):
        self.name = name
        self.focus = focus

    def __str__(self):
        return f"Role: {self.name}, Type: {self.focus}"

class Location:
    def __init__(self, name: str, population: int):
        self.name = name
        self.population = population

    def __str__(self):
        return f"Name: {self.name}, Population: {self.population}"

def create_login(name):
    split = name.split(" ")
    username = f"{split[0][0]}{split[1].lower()}"  
    lenght = 12
    characters = string.ascii_letters + string.digits + string.punctuation
    password = "".join(random.choice(characters) for _ in range(lenght))
    return username, password
    
def create_roles():
    roles = [
    "Software Engineer", "Data Scientist", "Product Manager", "UX/UI Designer", "Project Manager", 
    "Business Analyst", "Systems Administrator", "Network Engineer", "Web Developer", 
    "Content Strategist", "Social Media Manager", "Training and Development Manager", 
    "Supply Chain Analyst", "Business Development Manager", "Event Planner", 
    "Compliance Officer", "Insurance Underwriter", "Market Research Analyst", "Editorial Assistant", 
    "Corporate Trainer", "E-commerce Specialist", "HR" 
    ]
    engineer = [0, 1, 8]
    architecture = [6, 7]
    management = [4, 10, 12, 14, 18, 20]
    business = [2, 5, 9, 11, 15, 16, 19]
    art = [3, 13, 17]
    full_roles = []
    for i in range(len(roles)):
        if i in architecture:
            role = Role(roles[i], "Architecture")
            full_roles.append(role)
        elif i in engineer:
            role = Role(roles[i], "Engineer")
            full_roles.append(role)
        elif i in management:
            role = Role(roles[i], "Management")
            full_roles.append(role)
        elif i in business:
            role = Role(roles[i], "Business")
            full_roles.append(role)
        else:
            role = Role(roles[i], "Art")
            full_roles.append(role)
    return full_roles

def create_location():
    cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", 
    "San Diego", "Dallas",  "Jacksonville", "Fort Worth",
    "San Francisco", "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington D.C."
    ]
    populations = [8.34, 3.82, 2.67, 2.30, 1.64, 1.57, 1.47, 1.38, 1.3, 0.97, 
                   0.95, 3.51, 0.89, 0.88, 0.75, 0.71, 3.58
    ]
    full_cities = []
    for i in range(len(cities)):
        city = Location(cities[i], populations[i])
        full_cities.append(city)
    return full_cities

def calcuate_salary(focus, location):
    value = 0
    match focus:
        case "Architecture":
            value += random.randint(40, 50)
        case "Engineer":
            value += random.randint(30, 40)
        case "Management":
            value += random.randint(20, 30)
        case "Business":
            value += random.randint(10, 20)
        case _:
            value += random.randint(0, 10)
    if location >= 3.50:
        value += random.randint(40, 50)
    elif (location < 3.50) and (location >= 2.0):
        value += random.randint(30, 40)
    elif (location < 2.0) and (location >= 1.25):
        value += random.randint(20, 30)
    elif (location < 1.25) and (location >= 0.90):
        value += random.randint(10, 20)
    else:
        value += random.randint(0, 10)
    if value >= 85:
        salary = random.randint(165000, 180000)
    elif (value < 85) and (value >= 70):
        salary = random.randint(125000, 165000)
    elif (value < 70) and (value >= 55):
        salary = random.randint(85000, 125000)
    elif (value < 55) and (value >= 40):
        salary = random.randint(65000, 85000)
    elif (value < 40) and (value >= 25):
        salary = random.randint(40000, 65000)
    else:
        salary = random.randint(10000, 40000)
    return salary

def create_images(breakdown, salaries):
    count = []
    for i in range(len(breakdown)):
        count.append(breakdown[i])
        breakdown[i] = (breakdown[i]/NUM_ROWS) * 100
    labels = ['Architecture', "Engineers", "Management", "Business", "Art"]
    title = 'Overall Role Breakdown'
    outfile = 'role_pie_chart.png'
    assert np.isclose(sum(breakdown), 100.0)
    plt.figure(figsize=(8, 8))
    plt.pie(breakdown, labels=labels, autopct="%1.1f%%")
    plt.title(title)
    plt.axis('equal')
    plt.savefig(outfile, bbox_inches='tight')

    average = 0
    for i in range (len(salaries)):
        average += salaries[i]
        salaries[i] = salaries[i]/count[i]
    average = average/NUM_ROWS
    labels = ['Architecture', "Engineers", "Management", "Business", "Art"]
    title = 'Salary Role Breakdown'
    outfile = 'salary_bar_graph.png'
    plt.figure(figsize=(8, 6))
    bars = plt.bar(labels, salaries)
    plt.title(title)
    plt.xlabel('Professions')
    plt.ylabel('Yearly Salaries (in USD)')
    plt.xticks(rotation=45)
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2, height, f'{height:.1f}', ha='center', va='bottom')
    plt.tight_layout()
    plt.savefig(outfile)

    #Creates box with average salary in it
    # box_width = 10
    # box_height = 5
    # text = "$" + str(average)
    # outfile = 'average_salary.png'
    # fig, ax = plt.subplots()
    # box = patches.Rectangle((0, 0), box_width, box_height, edgecolor='black', facecolor='none', linewidth=2)
    # ax.add_patch(box)
    # ax.text(box_width/2, box_height/2, text, ha='center', va='center', fontsize=12)
    # ax.set_xlim(-1, box_width+1)
    # ax.set_ylim(-1, box_height+1)
    # ax.set_axis_off()
    # plt.savefig(outfile, bbox_inches='tight')

    plt.close()
    

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

cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", 
    "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", 
    "San Francisco", "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington D.C."
]

# id, name, phone, role, location, salary, manager
employees = []
creds = []
temp_names = []
names = set()
numbers = set()
roles = create_roles()
cities = create_location()
breakdown = [0, 0, 0, 0, 0] #Arch, Eng, Mang, Bus, Art
salaries = [0, 0, 0, 0, 0]
for i in range(1, NUM_ROWS + 1):
    id = i
    while len(names) < i:
        name = random.choice(fnames) + " " + random.choice(lnames)
        names.add(name)
    temp_names.append(name)
    username, password = create_login(name)
    while len(numbers) < i:
        first = random.randint(100, 999)
        mid = random.randint(100, 999)  
        last = random.randint(1000, 9999)  
        phone =  f"{first}-{mid}-{last}"
        numbers.add(phone)
    role = random.choice(roles)
    location = random.choice(cities)
    salary = calcuate_salary(role.focus, location.population)
    match role.focus:
        case "Architecture":
            breakdown[0] = breakdown[0] + 1
            salaries[0] = salaries[0] + salary
        case "Engineer":
            breakdown[1] = breakdown[1] + 1
            salaries[1] = salaries[1] + salary
        case "Management":
            breakdown[2] = breakdown[2] + 1
            salaries[2] = salaries[2] + salary
        case "Business":
            breakdown[3] = breakdown[3] + 1
            salaries[3] = salaries[3] + salary
        case "Art":
            breakdown[4] = breakdown[4] + 1
            salaries[4] = salaries[4] + salary
    if i != 1:
        manager = random.choice(temp_names)
    else:
        manager = "none"
    data_row = [
        id,
        name,
        phone,
        role.name,
        location.name,
        salary,
        manager
    ]
    employees.append(data_row)
    cred = [
        id,
        username,
        password
    ]
    creds.append(cred)

if os.path.exists('role_pie_chart.png'):
    os.remove('role_pie_chart.png')
    os.remove('salary_bar_graph.png')
create_images(breakdown, salaries)
populated = False
if os.path.exists(OUTPUT_FILE):
    populated = True
    os.remove(OUTPUT_FILE)
    with open(OUTPUT_FILE, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["id", "name", "phone", "role", "location", "salary", "manager"])
        writer.writerows(employees)
else:
    with open(OUTPUT_FILE, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["id", "name", "phone", "role", "location", "salary", "manager"])
        writer.writerows(employees)

json_data = []
with open(OUTPUT_FILE, 'r', encoding='utf-8') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        json_data.append(row)
with open("directory.json", 'w', encoding='utf-8') as json_file:
    json.dump(json_data, json_file, indent=4)

cred_json_data = []
for cred in creds:
    cred_json_data.append({
        "id": cred[0],
        "username": cred[1],
        "password": cred[2]
    })
with open("credentials.json", 'w', encoding='utf-8') as file:
     json.dump(cred_json_data, file, indent=4)

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

collection = db['credentials']
if 'credentials' in db.list_collection_names():
        db.drop_collection('credentials')
with open("credentials.json", 'r', encoding='utf-8') as file:
        data = json.load(file)
if isinstance(data, list):
    collection.insert_many(data)
else:
    collection.insert_one(data)
print("Sucessfully populated database")