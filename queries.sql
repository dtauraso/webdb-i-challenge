-- Database Queries

-- Find all customers with postal code 1010
SELECT CustomerName, PostalCode
FROM Customers
where PostalCode = 1010

-- Find the phone number for the supplier with the id 11
SELECT Phone
FROM Suppliers
where SupplierID = 11
-- List first 10 orders placed, sorted descending by the order date
SELECT *
FROM Orders
order by OrderDate desc
limit 10
-- Find all customers that live in London, Madrid, or Brazil
SELECT *
FROM Customers
WHERE City IN ('Madrid','London', 'Brazil');

-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
VALUES ("The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "Bag End", "111", "Middle Earth");
-- Update Bilbo Baggins record so that the postal code changes to "11122"
UPDATE Customers
SET PostalCode = "11122"
WHERE ContactName='Bilbo Baggins';
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
select distinct count(City) from Customers

-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
SELECT SUBSTR(SupplierName, 0, 20) FROM suppliers where length(SupplierName) > 20