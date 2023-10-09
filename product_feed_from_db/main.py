import sqlite3
import xml.etree.ElementTree as ET

dbfile = './data.sqlite'
con = sqlite3.connect(dbfile)
cursor = con.cursor()

# Fetch product data from the database
# Assuming 'status' indicates product availability
query = """
    SELECT p.product_id, pd.name, pd.description, p.image, p.price, m.name
    FROM product p
    JOIN product_description pd
    ON p.product_id = pd.product_id
    JOIN manufacturer m
    ON p.manufacturer_id = m.manufacturer_id
    WHERE p.status = '1'
"""

# Execute the query and fetch the results
cursor.execute(query)


# Create a new XML document
root = ET.Element("rss", attrib={"xmlns:g": "http://base.google.com/ns/1.0", "version": "2.0"})
channel = ET.SubElement(root, "channel")


# - ID [id]
# - Title [title]
# - Description [description]
# - Link [link]
# - Image link [image_link]
# - Additional image link [additional_image_link]
# - Availability [availability]
# - Price [price]
# - Brand [brand]
# - Condition [condition]


for row in cursor.fetchall():
    product = ET.SubElement(channel, "item")

    # print(row)

    ET.SubElement(product, "g:id").text = str(row[0])  # Product ID
    ET.SubElement(product, "g:title").text = row[1]  # Title
    ET.SubElement(product, "g:description").text = row[2]  # Description
    ET.SubElement(product, "g:link").text = f"https://butopea.com/p/{row[0]}"  # Product Link
    ET.SubElement(product, "g:image_link").text = f"https://butopea.com/{row[3]}"  # Product Link
    ET.SubElement(product, "g:availability").text = "in stock"  # Availability
    ET.SubElement(product, "g:price").text = f"{row[4]} HUF"  # Price
    ET.SubElement(product, "g:brand").text = row[5]  # Brand
    ET.SubElement(product, "g:condition").text = "new"  # Condition


    # Search for images
    additional_image_query = """
        SELECT product_id, image
        FROM product_image
        WHERE product_id = ?
        ORDER BY sort_order;
    """

    cursor.execute(additional_image_query, (row[0],))

    # Fetch the results from the other table
    additional_images = cursor.fetchall()

    print(additional_images, additional_image_query)

    # If the product exists in the other table, add the elements to the current product
    if len(additional_images) > 0:
        for image_row in additional_images:
            ET.SubElement(product, "g:additional_image_link").text =  f"https://butopea.com/{image_row[1]}"


# Save the XML document to a file
tree = ET.ElementTree(root)
tree.write("feed.xml", encoding="utf-8", xml_declaration=True)

# Be sure to close the connection
con.close()