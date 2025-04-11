# **AI Automation Agencies Make (Integromat) Process Documentation**

## **Features:**

| Process | Operations Consumption Estimate |
| :---- | :---- |
| Create Case Study | 18+ |
| Update Case Study | 18+ |
| Get Case Study | 16+ |
| Create AI Agency | 56+ |
| Update AI Agency | 56+ |
| Get AI Agency | 16+ |
| Auto Update Customer on Publish | 4 |
| Create New Service | 5+ |
| TOTAL ESTIMATE | 189+ |

Here is the estimated consumption of the features that we have. The “+” sign means that it would depend somehow on number of CMS items or inputs that the user have to add operation consumption in a scenario run. The ops consumption scales based on the user’s inputs.

*eg.: We wanted to create 10 more services upon submitting a case study form, then it would add to the default 5 operations that Create New Service feature will consume*

 The section below shows the breakdown of processes and their operation consumptions.

*Note: Please check the flowcharts section for the process flows.*

---

## **General Sub Scenarios:**

### 

### **Cron Job**

| API | Operation Cost Estimate | Input | Process | Output |
| :---- | :---- | :---- | :---- | :---- |
| Clear GDrive Folder every 12 hours (Formify) | **3+** (number of files uploaded into GDrive folder) | Uploaded Files from GDrive | Deletes every file uploaded in the GDrive folder every 12 hours | None |

### 

### **Webhook**

| API | Operation Cost Estimate | Input | Process | Output |
| ----- | :---- | :---- | :---- | :---- |
| Create Services by names | **5+** (number of services to be created) | \<csv format names for new service\> | Creates one or multiple new services depending on comma-separated values | \<csv format service names\> |
| Get City by ID (city.id) | **4** | City ID | Finds the CMS Item’s (City) data from Webflow via the City ID | { "name": ${city.name}, "slug": ${city.slug} } |
| Get City ID by Name (name → id) | **4** | City Name | Finds the CMS Item’s (City) ID from Webflow via the City name | City ID |
| Get Language IDs by Slug | **4** | Language Slug | Finds the CMS Item’s (Language) IDs from Webflow via CSV formatted Language Slugs | CSV formatted Language ID |
| Get Language Slugs by IDs | **5+** (number of available languages) | \<csv format language ids\> | Finds the CMS Item’s (Language) Slugs from Webflow via Language IDs | Language Slugs |
| Get Location by ID (location.id) | **3** | Location ID | Finds the CMS Item’s (Location) data from Webflow via the Location ID | Location Data |
| Get Location ID by Name | **4** | Location Name | Finds the CMS Item’s (Location) ID from Webflow via the Location name | Location ID |
| Get Service IDs by Slug | **4+** (number of available services) | Service Slug | Finds the CMS Item’s (Service) IDs from Webflow via CSV formatted Service Slugs | CSV formatted Service ID |
| Get Service Slugs by IDs | **4+** (number of available services) | CSV formatted Service IDs | Finds the CMS Item’s (Service) Slugs from Webflow via CSV formatted Service IDs | Service Slug Array |
| Upload Single File to GDrive | **3** | Object file | Uploads a file to GDrive and returns the Web Content link | Web Content link |

---

## **Main Scenarios:**

### 

### **Watch Event**

| API | Operation Cost Estimate | Input | Process | Output |
| ----- | :---- | :---- | :---- | :---- |
| Auto send email for notification | **4** | Object file | **1\. Case Study Trigger** \- Look for a Published Case Study \- If not yet published, proceed \- Get the connected AI Agency \- Send email to both client and owner \- Update the Webflow CMS item to prevent retriggering **2\. AI Agency Trigger** \- Look for a Published AI Agency \- If not yet published, proceed- Send email to both client and owner \- Update the Webflow CMS item to prevent retriggering | None |

### 

### **Webhook**

| API | Operation Cost Estimate | Input | Process | Output | Note |
| ----- | :---- | :---- | :---- | :---- | :---- |
| Update AI Agency Webhook | **56+ in Total** \- Get Service IDs by Slug (\[service.id\]): **4+** \- Get Language IDs by Slug (\[language.id\]): **4** \- Get Location ID by Name (name → location.id): **4** \- Get City ID by Name (name → city.id): **4** \- Upload Single File to GDrive: **21 (3×7 file uploads)** \- Create Services by names: **5+** | 1\. Update: Form data \+ AI Agency ID2. Create: Form data | **1\. Update:** \- Look for the desired AI Agency in the list \- Find the update button- Submit form via Directory Registration page **2\. Create:** \- Go to Sign up page- Submit form via Directory Registration page **3\. Create New Service:** \- Whenever we have CSV formatted services included, we will create | AI Agency data | We use only one Webhook for form data; it handles both create and update logic. |
| Create AI Agency | **56+ in Total** \- Get Service IDs by Slug (\[service.id\]): **4+** \- Get Language IDs by Slug (\[language.id\]): **4** \- Get Location ID by Name (name → location.id): **4** \- Get City ID by Name (name → city.id): **4** \- Upload Single File to GDrive: **21 (3×7 file uploads)** \- Create Services by names: **5+** | Form data | \- Go to Sign up page \- Submit form via Directory Registration page | AI Agency data |  |
| Update Case Study Webhook | **18+ in Total** \- Create Services by names: **5+** \- Get Service IDs by Slug (\[service.id\]): **4+** \- Upload Single File to GDrive: **3** | **1\. Update:** Form data \+ Case Study ID **2\. Create:** Form data | **1\. Update:** \- Look for the desired Case Study in the list \- Find the update button \- Submit form via Case Study Form page **2\. Create:**\- Visit your existing AI Agency page- Submit form via Case Study Form page | Case Study data | This webhook handles both create and update due to form data entry flow. |
| Add Case Study Webhook | **18+ in Total** \- Create Services by names: **5+** \- Get Service IDs by Slug (\[service.id\]): **4+** \- Upload Single File to GDrive: **3** | Form data | \- Visit your existing AI Agency page- Submit form via Case Study Form page | Case Study data |  |
| Get AI Agency by ID Webhook | **16+ in Total** \- Get Location by ID: **3** \- Get City by ID: **4** \- Get Service Slugs by IDs: **4+** \- Get Language Slugs by IDs: 5+ | AI Agency ID | \- Visit your existing AI Agency page- Click update button to redirect to the form page | AI Agency Data |  |

---

## **Flowcharts:**

* Create Case Study

![image](https://github.com/user-attachments/assets/74d096a7-4b3b-46d7-8f66-8a6ce0435073)

* Update Case Study

![image](https://github.com/user-attachments/assets/43c227a1-833a-4941-9e95-e3352ecfd4d5)

* Get Case Study

![image](https://github.com/user-attachments/assets/05dfa395-0023-4b36-bf8e-ef89b2ca2f89)

* Create AI Agency

![image](https://github.com/user-attachments/assets/3649ebff-fa35-4218-82a8-d7d14c472608)

* Update AI Agency

![image](https://github.com/user-attachments/assets/04eeb9ed-ec5a-4940-8990-49f3e9ea75d3)

* Get AI Agency

![image](https://github.com/user-attachments/assets/a6f325f8-46e6-4b75-9619-8c0c467f7e82)

* Automatically update customer when Case Study/ AI Agency is published

![image](https://github.com/user-attachments/assets/3c64ab78-13e6-4d1f-9939-ddfde239c510)

* Create New Services

![image](https://github.com/user-attachments/assets/979d3c7a-14a1-41e2-bfb4-2f073d3a04d3)

## **Extra Instructions:**

* **Where do we find scenarios?**  
  Scenarios are the bulk of modules stitched together to form a process. To find them, go ahead and view the sidebar. Click **Scenarios,** and then you’ll see 2 folders here,e which are:

![image](https://github.com/user-attachments/assets/f696c558-6518-4bf9-bd19-44b750030320)

**Main Scenarios** \- Collection of scenarios that has the major functionality of the whole backend  
**General Sub Scenarios** \- Collection of scenarios that could be iterated, reused in different scenarios, and handle small-scale processes.

![image](https://github.com/user-attachments/assets/2d5ababc-14b6-4ccf-afb2-74298dc09750)

* **Where do we find logs of every scenario run?**  
  Upon visiting a scenario, you may click on the **HISTORY** tab or the list in the right sidebar

![image](https://github.com/user-attachments/assets/d5993427-0e20-43fc-99ff-4542eff29a44)

Upon opening the history tab, you’ll see a list of logs. You may click the **Details** button to check where it went wrong or just to see how it’s going in the success state.

![image](https://github.com/user-attachments/assets/ef26b8ee-bad1-4c99-aa31-78988d5b80a6)

![image](https://github.com/user-attachments/assets/ed1ba401-8c4d-4577-a903-0b71e6dd2a44)

* **How do we calculate the operations per scenario?**  
  The process to find this is the same as how we view the history/logs of a scenario (please check the answer above). Then, let’s take a look at these bubbles with numbers inside them. These numbers are the count of operations consumed here. This scenario is for deleting files inside a specific folder in the GDrive. As you can see, the last module has **3** consumed operations due to it deleting **3** files.

![image](https://github.com/user-attachments/assets/69111fb3-aa2e-4e73-9f88-5901dee43ec9)

* Unit Testing and End-to-end Testing  
  Unit testing is very important for reviewing how the chained modules would work. We may only chain modules that we would like to test. Why do we do this? We wanted to minimize the consumption of the operations for every test. We don’t wanna consume the entire allocation of operation in a scenario just to test a simple functionality of a module or a chain. We might need to unlink modules from modules to isolate the testing. Connecting only those we need to test.

![image](https://github.com/user-attachments/assets/8330e695-7536-4500-bfef-1b0448dd7266)

End-to-end testing, on the other hand, is needed to run the whole scenario per test case. Make sure to list your test cases, the outcomes we expect, and the results of the run-through. We can click the **Run once** button to start testing from start to finish of a scenario.

![image](https://github.com/user-attachments/assets/5e9322d4-88c4-444a-b32c-f58cf3f03ca9)

* **How to use Sub-scenarios?**  
  We use sub-scenarios to avoid putting all the chain of modules together in a scenario. To make a reusable chain of modules, we may create another scenario for them. Then we’ll use the HTTP Request module for this:

![image](https://github.com/user-attachments/assets/8f292517-00d2-4985-86fa-69086966bd4b)

You may copy the URL of the Webhook of your sub-scenario and paste it into this form. The Method should be **POST** and then the Body type should be **Multipart/form-data**. The popup on the right side contains data taken from the previous modules so you could transfer the data from here onto the HTTP Request module.

* **How to use scripts?**  
  Scripting is a powerful tool to be able to manipulate raw files, strings, numbers, arrays, or even objects. Please check this [sample tutorial](https://jwdt.medium.com/using-javascript-with-integromat-6fe38c47830c), we also have these samples in our Make account. Below uses a ternary operator to output a value **\[\]** or **\[“slug1”, “slug2”\]**. We’re using the **if-else statement** to compare the value of the input’s length if it is 0 or more than.

![image](https://github.com/user-attachments/assets/55427326-843c-4782-9938-c06d6f913144)
