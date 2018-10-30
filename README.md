# Riders match in the 2018 IDF
find the round in common of the riders in the[IDF](https://internationaldownhillfederation.org/) (International Downhill Federation)2018.

![enter image description here](https://raw.githubusercontent.com/santiagoconde0/commonDowns/master/img/demo.gif)

# Technologies used

* HTML 5
* CSS
* Javascript
* D3 v4
* Bootstrap

## How to run?

Clone the repository:
`git clone https://github.com/santiagoconde0/commonDowns.git`
deploy on a server like http-server, Tomcat, nginx, etc.

## Authors

Santiago Suárez Conde

## Demo link

https://santiagoconde0.github.io/commonDowns/

## [Video explanation](https://www.youtube.com/watch?v=pjugCoZjgCI&t=27s)


#  FW Tamara

###  WHAT?

**Data and Dataset Type:** 
-> Networks & Trees
* Item (Nodes):  Riders 
* Links:  Common rounds

**Attributes:**
*Country* -> Categorical 
*ID(Name)* -> Categorical 
*RaceName* -> Categorical 
*Year* -> Ordered -> Quantitative - Sequential

### WHY?

**Principal task** 
* **Explore** the **topology** of the common rounds of the riders.

**Secondary tasks**

* **Identify** the **Dependence** between the riders.
*  **Identify** the groups of riders **Outliers**. 
* **Browse** the **Topology** of riders from the specifict country 
* **Enjoy.** 


### HOW? 

**Encode:** 
*Separate* - *order*

**Manipulate:** 
*Select - Navigate*

**Reduce:**
*Filter*: Filter by riders and country

### Marks:
* Points: Reprsent a rider  
 
### Chanels:

* Lines: Represent a common round 
* Area: shows the density of riders with common rounds

###  Insights

* Brazilians have riders with more rounds in common.
* United states is the country with most riders in the IDF.

## DATA

* data take from https://internationaldownhillfederation.org/
