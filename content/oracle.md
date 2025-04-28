# Oracle数据库

## 数据类型

### number

### float

### Char

### NChar类型

存储==固定长度（创建表时决定）==的 Unicode字符数据

```sql
create table nchar_demo(
	description NCHAR(10)
)
```

### varchar2

### Nvarchar

### Date

==oracle数据库输入和输出的标准日期格式是：DD-MON-YY==

```sql
select
	sysdate
from
	dual;
```

![image-20240920095948296](D:\桌面\Java\Oracle.assets\image-20240920095948296.png)

假设想要佳能标准日期格式更改为`YYYY-MM-DD`,那么可以使用ALTER SESSION 语句来更改 NLS_DATE_FORMAT参数的值，

```sql
ALTER SESSION SET NKS_DATE_FORMAT = 'YYYY-MM-DD';
```



## Order By

ASC 升序      ；     DESC  降序

```sql
select name, address,credit_limit  from customers   order by   name asc, address desc;
```

```sql
UPPER() #函数区分大小写
```

## Distinct

==过滤结果集中的重复行==

```sql
select name,distinct age from student where new = 1;
```

## Where

获取标价在650到680之间

```sql
select
	product_name,
	list_price
from
	products
where
	list_price between 650 and 680 #等效 list_price >= 650 and list_price <= 680
order by 
	list_price;
```

## or

```sql
select 
	order_id,
	customer_id,
	status,
	salesman_id,
	TO_CHAR(order_date,'YYYY-MM-DD') AS order_date
from
	orders
where
	salesman_id = 60 or salesman_id = 61 or salesman_id = 62
	#等效于 salesman_id in(60,61,62)
order by
	order_date desc;
```

## fetch first

限制查询返回的行数

```sql
select 
	column1,column2,...
from
	table_name
where 
	conditions
order by 
	column_name
fetch first n rows only;
```



## Oracle 字符串函数

### Ascii()函数

返回代表指定字符的数字值代码

```sql
ASCII('t')
Result : 116
```

### Asciistr()函数

将任何字符集中的字符串转换为ASCII字符串



