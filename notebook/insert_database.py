import mysql.connector
import csv


def chunk(lst, chunk_size):
    return [lst[i : i + chunk_size] for i in range(0, len(lst), chunk_size)]


def escape_string(s):
    return (
        s.replace("'", "''")
        .replace('"', '""')
        .replace("\\", "\\\\")
        .replace("\n", "\\n")
        .replace("\r", "\\r")
    )


def create_connection():
    client = mysql.connector.connect(
        host="",
        user="",
        password="",
        database="",
    )

    return client


def create_restaurant_table(client):
    cursor = client.cursor()
    cursor.execute(
        """
    CREATE TABLE restaurant (
        id INT AUTO_INCREMENT PRIMARY KEY,
        region_code VARCHAR(10) NOT NULL,
        management_code VARCHAR(50) NOT NULL,
        call_number VARCHAR(20) DEFAULT NULL,
        statutory_address VARCHAR(255) NOT NULL,
        business_name VARCHAR(100) NOT NULL,
        business_type VARCHAR(100) NOT NULL,
        longitude DECIMAL(20, 12) NOT NULL,
        latitude DECIMAL(20, 12) NOT NULL,
        homepage_url VARCHAR(255) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
    """
    )


def insert_restaurant_data(client, rows):
    sql_lines = []
    print(len(rows))

    for row in rows:
        region_code = row[1]
        management_code = row[2]
        call_number = row[13]
        statutory_address = row[16]
        business_name = row[19]
        business_type = row[23]
        x = row[24]
        y = row[24]
        homepage_url = row[44]

        sql_lines.append(
            f"('{region_code}', '{management_code}', '{call_number}', '{statutory_address}', '{escape_string(business_name)}', '{business_type}', {x}, {y}, '{homepage_url}')"
        )

    sql = (
        "INSERT INTO restaurant (region_code, management_code, call_number, statutory_address, business_name, business_type, longitude, latitude, homepage_url) VALUES "
        + ",".join(sql_lines)
        + ";"
    )

    cursor = client.cursor()
    cursor.execute(sql)


def insert_all_data():
    f = open("result.csv", "r", encoding="utf-8")
    reader = csv.reader(f)
    reader.__next__()

    reader.__next__()

    chunked_rows = chunk(list(reader), 100)

    client = create_connection()
    for i in range(len(chunked_rows)):
        print(i)
        insert_restaurant_data(client, chunked_rows[i])

    client.commit()
    client.close()


insert_all_data()
