# Generating product feed from database

Create an XML product feed file according to the Google Merchant product data specifications from an SQLite file-based database.

## Install dependencies

```python
pip install lxml
```

## Run the code

```python
python main.py
```

## TO-DO

- Refactor the code where quering in loop

```python
additional_image_query = """
    SELECT product_id, image
    FROM product_image
    WHERE product_id = ?
    ORDER BY sort_order;
"""
```
