# Formify Pages and JavaScript Interactions Documentation

## Overview

This documentation outlines the interactions between Formify's web pages and their corresponding JavaScript files. The application consists of several key pages that handle agency registrations and case study submissions through a series of forms and webhooks.

## Directory Structure

```
formify/
├── pages/
│   ├── case-study/
│   │   └── body-script/
│   │       ├── auto-fill-case-study-form.js
│   │       ├── form-webhook.js
│   │       ├── quill-custom-script.js
│   │       └── url-param-form-filler.js
│   └── directory-registration/
│       └── body-script/
│           ├── auto-fill-directory-reg-form.js
│           ├── form-webhook.js
│           └── url-param-form-filler.js
├── templates/
│   └── directory-registration/
│       └── body-script/
│           ├── memberstack.js
│           └── youtube-add-field-btn.js
└── diagrams/
    ├── frontend/
    │   ├── auth-flow.puml        # Authentication workflow diagram
    │   └── form-submission.puml  # Form submission workflow diagram
    └── images/                   # Place generated PNG files here
        ├── frontend/
        └── backend/
```

## Page Interactions

### 1. Directory Registration Form
**URL**: `/formify-service-partner-program`

**Key Files**:
- `directory-registration/body-script/form-webhook.js`
- `directory-registration/body-script/auto-fill-directory-reg-form.js`
- `directory-registration/body-script/url-param-form-filler.js`

**Workflow**:
1. User accesses registration form
2. Authentication check via Memberstack
3. Form initialization and URL parameter parsing
4. File upload handling for agency logo
5. Form submission to Make.com webhook

![image](https://github.com/user-attachments/assets/174a2ca4-0c01-44eb-a5e6-8f8647760b16)

![image](https://github.com/user-attachments/assets/0040ba4e-ed0e-47c9-bf66-8b018d63d9cc)

### 2. Case Study Form
**URL**: `/case-study-form`

**Key Files**:
- `case-study/body-script/form-webhook.js`
- `case-study/body-script/auto-fill-case-study-form.js`
- `case-study/body-script/quill-custom-script.js`

**Workflow**:
1. Agency ID validation from URL
2. Rich text editor initialization (Quill)
3. Image upload handling
4. Form submission and validation
5. Data processing through Make.com

![image](https://github.com/user-attachments/assets/88e0a69e-1b49-4c5d-8b7e-4e439851a30f)


## Key Components

### 1. Authentication (Memberstack)
**File**: `templates/directory-registration/body-script/memberstack.js`

**Functionality**:
- User authentication check
- Access control for forms
- UI element visibility management

### 2. Form Handling
**Files**: `form-webhook.js` (in both directories)

**Features**:
- Form submission handling
- File upload processing
- Loading state management
- Error handling
- Success/failure messaging

### 3. Auto-fill Functionality
**Files**: 
- `auto-fill-directory-reg-form.js`
- `auto-fill-case-study-form.js`
- `url-param-form-filler.js`

**Features**:
- Populates form fields from URL parameters
- Handles existing data retrieval
- Manages update scenarios

## Make.com Integration

### Webhook Endpoints
1. Directory Registration:
   ```
   https://hook.eu2.make.com/ybgygnkb3tcwrbfb3jlxiuk54bijycnj
   ```

2. Case Study Submission:
   ```
   https://hook.eu2.make.com/3hcg4kscxx1q9k1k9kjvamaget87yd4j
   ```

### Data Flow
1. Form Submission
   - Data validation
   - File processing
   - Webhook trigger

2. Data Retrieval
   - Agency/Study ID validation
   - Data fetching
   - Form population

## Best Practices

1. **Form Handling**
   - Always validate input data
   - Show loading states during operations
   - Handle file uploads with progress indicators
   - Provide clear error messages

2. **Authentication**
   - Check member status before form access
   - Validate agency/study IDs
   - Handle unauthorized access appropriately

3. **Data Management**
   - Validate data before submission
   - Handle file uploads securely
   - Maintain consistent error handling
   - Implement proper loading states

## Maintenance and Updates

1. **Adding New Features**
   - Update relevant PUML diagrams
   - Regenerate PNG files
   - Update documentation
   - Test all integrations

2. **Troubleshooting**
   - Check browser console for errors
   - Verify webhook endpoints
   - Validate form data
   - Test file upload functionality 
