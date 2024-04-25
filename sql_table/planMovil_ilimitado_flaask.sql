CREATE TABLE planMovil_IliFla (
Id SERIAL PRIMARY KEY,
Tipo_Plan VARCHAR(20) NOT NULL,
VPromocion BOOLEAN NOT NULL,
Tiempo_Promocion_Descuento INT,
Tiempo_Promocion_Gb INT,Descuento INT,
Llamadas_Ilimitadas BOOLEAN NOT NULL,
Internet_Ilimitado BOOLEAN NOT NULL,
Tipo_Chip VARCHAR(30) NOT NULL,
Bono_Tiktok INT,
Precio_Base DECIMAL(10,2) NOT NULL,
Precio_Promocional DECIMAL(10,2),
Gb_Acumulables INT NOT NULL,
Gb_Spotify INT NOT NULL,
Gb_TV360 INT NOT NULL)