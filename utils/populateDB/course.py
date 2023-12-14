import os
import pandas as pd
import psycopg2

def connect_to_db():
    db_url = "localhost:5432/wguhub"
    username = "postgres"
    password = "user"

    return psycopg2.connect(
        dbname=db_url.split("/")[-1],
        user=username,
        password=password,
        host=db_url.split(":")[0]
    )

def import_data_from_csv(file_path):
    print(f"Connecting to database for file: {file_path}")
    conn = connect_to_db()
    cur = conn.cursor()
    print(f"Reading CSV file: {file_path}")

    df = pd.read_csv(file_path, header=None)

    degree_name = df.iloc[0, 0].strip()
    print(f"Processing degree: {degree_name}")

    cur.execute("SELECT degree_id FROM degree WHERE degree_name = %s;", (degree_name,))
    result = cur.fetchone()

    if result is None:
        print(f"Degree not found: {degree_name} in file: {file_path}")
        return  # Stop processing this file

    degree_id = result[0]
    duplicate_courses = {}

    for index, row in df.iterrows():
        if index == 0 or pd.isna(row[1]):
            continue

        course_code = row[1].strip()
        course_name = row[2].strip()
        course_credits = row[3]

        # Check if course exists and insert if not
        cur.execute("SELECT course_id FROM course WHERE course_code = %s;", (course_code,))
        course_result = cur.fetchone()

        if course_result is None:
            # Insert new course
            cur.execute("""
                INSERT INTO course (course_code, course_name, course_credits)
                VALUES (%s, %s, %s)
                RETURNING course_id;
                """, (course_code, course_name, course_credits))
            course_id = cur.fetchone()[0]
            print(f"New course added: {course_code}")
        else:
            course_id = course_result[0]

        # Insert into course_degree table, track duplicates
        cur.execute("""
            INSERT INTO course_degree (course_id, degree_id)
            VALUES (%s, %s)
            ON CONFLICT DO NOTHING
            RETURNING course_degree_id;
            """, (course_id, degree_id))

        if cur.fetchone() is None:
            duplicate_courses[course_code] = duplicate_courses.get(course_code, 0) + 1
            print(f"Duplicate detected for course {course_code}")

    conn.commit()
    cur.close()
    conn.close()

    for course_code, count in duplicate_courses.items():
        print(f"Duplicate course {course_code} encountered {count} times in file: {file_path}")

def main():
    folder_path = '.csvFiles'
    total_files = len([name for name in os.listdir(folder_path) if name.endswith('.csv')])
    print(f"Total CSV files to process: {total_files}")

    processed_files = 0
    for filename in os.listdir(folder_path):
        if filename.endswith('.csv'):
            file_path = os.path.join(folder_path, filename)
            print(f"\nProcessing file {processed_files + 1}/{total_files}: {file_path}")
            import_data_from_csv(file_path)
            processed_files += 1

    print(f"\nProcessing complete. Total files processed: {processed_files}")

if __name__ == "__main__":
    main()
