programs_str = """
B.S. Business Administration - Accounting
B.S. Business Administration - Human Resource Management
B.S. Business Administration - Information Technology Management
B.S. Business Administration - Management
B.S. Business Administration - Marketing
B.S. Finance
B.S. Healthcare Administration
B.S. Supply Chain and Operations Management
Master of Business Administration
MBA Information Technology Management
MBA Healthcare Management
M.S. Management and Leadership
M.S. Marketing (Digital Marketing Specialization)
M.S. Marketing (Marketing Analytics Specialization)
M.S. Accounting
M.S. Human Resource Management
Certificate: Leadership
B.S. Nursing Prelicensure (Pre-Nursing)
B.S. Nursing Prelicensure (Nursing)
B.S. Nursing (RN to BSN)
B.S. Health Information Management
B.S. Health and Human Services
M.S. Nursing - Family Nurse Practitioner
M.S. Nursing - Psychiatric Mental Health Nurse Practitioner
M.S. Nursing - Education
M.S. Nursing - Leadership and Management
M.S. Nursing - Nursing Informatics
M.S. Nursing - Education (RN to MSN)
M.S. Nursing - Leadership and Management (RN to MSN)
M.S. Nursing - Nursing Informatics (RN to MSN)
Master of Healthcare Administration
Post-Master's Certificate, Nursing - Family Nurse Practitioner
Post-Master's Certificate, Nursing - Psychiatric Mental Health Nurse Practitioner
Post-Master's Certificate, Nursing - Education
Post-Master's Certificate, Nursing - Leadership and Management
B.S. Cloud Computing (AWS Track)
B.S. Cloud Computing (Azure Track)
B.S. Cloud Computing (Multi-Cloud Track)
B.S. Computer Science
B.S. Cybersecurity and Information Assurance
B.S. Data Analytics
B.S. Information Technology
B.S. Information Technology (BSIT to MSITM)
B.S. Network Engineering and Security
B.S. Network Engineering and Security (Cisco Track)
B.S. Software Engineering (Java Track)
B.S. Software Engineering (C# Track)
M.S. Cybersecurity and Information Assurance
M.S. Data Analytics
M.S. Information Technology Management
Certificate: Front End Web Development
Certificate: Web Application Deployment and Support
B.A. Educational Studies
B.A. Elementary Education
B.A. Special Education and Elementary Education (Dual Licensure)
B.A. Special Education (Mild to Moderate)
B.S. Mathematics Education (Middle Grades)
B.S. Mathematics Education (Secondary)
B.S. Science Education (Middle Grades)
B.S. Science Education (Secondary Biological Science)
B.S. Science Education (Secondary Chemistry)
B.S. Science Education (Secondary Earth Science)
B.S. Science Education (Secondary Physics)
M.A. Teaching, Elementary Education
M.A. Teaching, English Education (Secondary)
M.A. Teaching, Mathematics Education (Middle Grades)
M.A. Teaching, Mathematics Education (Secondary)
M.A. Teaching, Science Education (Secondary)
M.A. Teaching, Special Education
M.S. Curriculum and Instruction
M.S. Educational Leadership
M.Ed. Education Technology and Instructional Design (K-12 and Adult Learner)
M.Ed. Education Technology and Instructional Design (Adult Learner)
M.Ed. Education Technology and Instructional Design (K-12 Learner)
M.A. English Language Learning (ELL) (PreK-12)
M.A. Mathematics Education (K-6)
M.A. Mathematics Education (Middle Grades)
M.A. Mathematics Education (Secondary)
M.A. Science Education (Middle Grades)
M.A. Science Education (Secondary Biological Science)
M.A. Science Education (Secondary Chemistry)
M.A. Science Education (Secondary Earth Science)
M.A. Science Education (Secondary Physics)
Endorsement Preparation Program, English Language Learning (ELL) (PreK-12)
"""


import psycopg2

programs = programs_str.strip().split('\n')
print((programs))

try:

    db_url = ""
    username = ""
    password = ""

    conn = psycopg2.connect(
        dbname=db_url.split("/")[-1],
        user=username,
        password=password,
        host=db_url.split(":")[0]
    )
    cursor = conn.cursor()

    print("Connected to database!")

    for program in programs:
        cursor.execute("INSERT INTO degree (degree_name) VALUES (%s)", (program,))

    conn.commit()
    cursor.close()
    conn.close()

    print("Data insertion complete.")

except Exception as e:
    print(f"An error occurred: {e}")


