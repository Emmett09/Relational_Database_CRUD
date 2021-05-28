-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 04, 2021 at 03:07 PM
-- Server version: 10.3.27-MariaDB-0+deb10u1
-- PHP Version: 7.3.27-1~deb10u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs230_p210160`
--

-- --------------------------------------------------------

--
-- Table structure for table `Home_Address`
--

CREATE TABLE `Home_Address` (
  `Home_Address_ID` int(20) UNSIGNED NOT NULL,
  `Line1` varchar(80) NOT NULL,
  `Line2` varchar(80) DEFAULT NULL,
  `Town` varchar(80) NOT NULL,
  `County` varchar(80) NOT NULL,
  `Eircode` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Home_Address`
--

INSERT INTO `Home_Address` (`Home_Address_ID`, `Line1`, `Line2`, `Town`, `County`, `Eircode`) VALUES
(1, '123 Fake Street', 'Fake Road', 'Faynooth', 'Kildare', 'D11JK18'),
(2, '45 Wakefield Avenue', 'Moby Road', 'Glasnevin', 'Dublin', 'D15FK11'),
(3, 'Parkfield House', 'Parkfield', 'Clondalking', 'Dublin', 'D8GF19'),
(4, '78 Beechfield Drive ', 'Beechfield', 'Castleknock', 'Dublin', 'D15HJ98'),
(5, '65 Park Avenue', 'Deerpark', 'Castleknock', 'Dublin ', 'D15FG19'),
(6, '93 Chesterfield Avenue', 'Strand Road ', 'Clontarf', 'Dublin ', 'D5FH76'),
(7, '10 Park Road', 'Main Street', 'Navan', 'Meath', 'A87AP87'),
(8, '66 Park Road', 'Park Avenue', 'Clonsilla', 'Dublin', 'D15FD91'),
(9, '90 Crestfield Avenue', 'Crestfield Raod', 'Finglas', 'Dublin ', 'D11KL98'),
(10, '12 Seafield Road ', 'Collins Avenue', 'Finglas', 'Dublin', 'D11JK51');

-- --------------------------------------------------------

--
-- Table structure for table `Shipping_Address`
--

CREATE TABLE `Shipping_Address` (
  `Ship_Address_ID` int(20) UNSIGNED NOT NULL,
  `Line1` varchar(80) NOT NULL,
  `Line2` varchar(80) DEFAULT NULL,
  `Town` varchar(80) NOT NULL,
  `County` varchar(80) NOT NULL,
  `Eircode` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `Shipping_Address`
--

INSERT INTO `Shipping_Address` (`Ship_Address_ID`, `Line1`, `Line2`, `Town`, `County`, `Eircode`) VALUES
(1, '123 Fake Street', 'Fake Road', 'Clonee', 'Dublin', 'D15KL19'),
(2, '45 Wakefield Avenue', 'Moby Road', 'Glasnevin', 'Dublin', 'D15FK11'),
(3, 'Parkfield House', 'Parkfield', 'Clondalkin', 'Dublin', 'D8GF19'),
(4, '78 Beechfield Drive', 'Beechfield', 'Castleknock', 'Dublin', 'D15HJ98'),
(5, '65 Park Avenue', 'Deerpark', 'Castleknock', 'Dublin', 'D15FG19'),
(6, '93 Chesterfield Avenue', 'Strand Road', 'Clontarf', 'Dublin', 'D5FH76'),
(7, '10 Park Road', 'Main Street', 'Navan', 'Meath', 'A87AP87'),
(8, '66 Park Road', 'Park Avenue', 'Clonsilla', 'Dublin', 'D15FD91'),
(9, '90 Crestfield Avenue', 'Crestfield Road', 'Finglas', 'Dublin', 'D11KL98'),
(10, '12 Seafield Road', 'Collins Avenue', 'Finglas', 'Dublin', 'D11JK51');

-- --------------------------------------------------------

--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `Customer_ID` int(20) UNSIGNED NOT NULL,
  `Title` varchar(80) DEFAULT NULL,
  `FName` varchar(80) NOT NULL,
  `LName` varchar(80) NOT NULL,
  `Mobile` varchar(20) NOT NULL,
  `Email` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `USERS`
--

INSERT INTO `USERS` (`Customer_ID`, `Title`, `FName`, `LName`, `Mobile`, `Email`) VALUES
(1, 'Mr.', 'John', 'Keating', '0833333333', 'john.keathing@mu.ie'),
(2, 'Mr.', 'Emmett', 'Mulroy', '0877777777', 'emmet.mulroy@mu.ie'),
(3, 'Ms.', 'Jane', 'Doe', '0851545145', 'janedoe@hotmail.com'),
(4, 'Mr.', 'John', 'Dory', '0879874569', 'johndory@mumail.ie'),
(5, 'Mrs.', 'Samantha', 'Cullen', '0897412587', 'scullen@gmail.com'),
(6, 'Mr.', 'Rafael', 'DeLaghetto', '0866666666', 'rdlg@hotmail.com'),
(7, 'Mrs.', 'Sally', 'Lally', '08555555555', 'sallylally@gmail.com'),
(8, 'Mr.', 'Hubert', 'Cumberdale', '0899999999', 'hcumberdale@gmail.com'),
(9, 'Ms.', 'Marjory', 'Baxter', '0877894561', 'marjorybaxter@hotmail.com'),
(10, 'Ms.', 'Laura', 'West', '0896541236', 'lwest@hotmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Home_Address`
--
ALTER TABLE `Home_Address`
  ADD PRIMARY KEY (`Home_Address_ID`),
  ADD UNIQUE KEY `Home_Address_ID` (`Home_Address_ID`);

--
-- Indexes for table `Shipping_Address`
--
ALTER TABLE `Shipping_Address`
  ADD PRIMARY KEY (`Ship_Address_ID`),
  ADD UNIQUE KEY `Ship_Address_ID` (`Ship_Address_ID`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`Customer_ID`),
  ADD UNIQUE KEY `ID` (`Customer_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Home_Address`
--
ALTER TABLE `Home_Address`
  MODIFY `Home_Address_ID` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `Shipping_Address`
--
ALTER TABLE `Shipping_Address`
  MODIFY `Ship_Address_ID` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `Customer_ID` int(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Home_Address`
--
ALTER TABLE `Home_Address`
  ADD CONSTRAINT `FK_HAddresses_Users` FOREIGN KEY (`Home_Address_ID`) REFERENCES `USERS` (`Customer_ID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `Shipping_Address`
--
ALTER TABLE `Shipping_Address`
  ADD CONSTRAINT `FK_Addresses_Users` FOREIGN KEY (`Ship_Address_ID`) REFERENCES `USERS` (`Customer_ID`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
