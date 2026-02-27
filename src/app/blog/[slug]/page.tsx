import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogContent } from "@/components/BlogContent";
import Link from "next/link";

const baseUrl = "https://www.crmfinex.com";

const blogPosts = {
  "mastering-salesforce-flow-advanced-automation": {
    title: "Mastering Salesforce Flow: Advanced Automation Patterns for Enterprise",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Salesforce Flow",
    content: `
# Mastering Salesforce Flow: Advanced Automation Patterns for Enterprise

Salesforce Flow has evolved into a powerful automation platform that can handle complex business processes. However, as your organization scales, you'll need to implement sophisticated patterns to maintain performance, reliability, and maintainability.

## 1. Error Handling and Recovery Patterns

### Graceful Degradation
Implement fallback mechanisms when external systems are unavailable:

\`\`\`apex
// In your Flow, use Decision elements to check for errors
// and provide alternative paths
IF {!$Flow.FaultMessage} = "External System Unavailable"
  THEN: Send notification to admin
  ELSE: Continue with normal process
\`\`\`

### Retry Logic with Exponential Backoff
For critical processes, implement retry mechanisms:

\`\`\`apex
// Use Loop elements with counter variables
// Implement delays that increase with each retry
{!RetryCount} < 3 AND {!$Flow.FaultMessage} != null
\`\`\`

## 2. Performance Optimization Techniques

### Bulk Processing Patterns
When dealing with large datasets, process records in batches:

\`\`\`apex
// Use Get Records with LIMIT 200
// Process in chunks to avoid governor limits
// Use Collection variables to accumulate results
\`\`\`

### Lazy Loading and Conditional Logic
Only execute expensive operations when necessary:

\`\`\`apex
// Use Decision elements to check conditions first
// Only query additional data when required
IF {!Account.RecordType} = "Enterprise"
  THEN: Get additional account details
\`\`\`

## 3. Advanced Data Transformation

### Complex Mapping with Collections
Use Collection variables for sophisticated data manipulation:

\`\`\`apex
// Create Collection variables for:
// - Input data
// - Transformed data  
// - Error records
// - Success records
\`\`\`

### Dynamic Field Mapping
Implement flexible field mapping using Custom Metadata:

\`\`\`apex
// Query Custom Metadata Types for field mappings
// Use Assignment elements to dynamically map fields
// Support different object types with same logic
\`\`\`

## 4. Integration Patterns

### Asynchronous Processing
For long-running processes, use Platform Events:

\`\`\`apex
// Publish Platform Event from Flow
// Use Process Builder or Flow to handle the event
// Implement proper error handling and monitoring
\`\`\`

### API Rate Limiting
Implement intelligent API call management:

\`\`\`apex
// Use Custom Settings to track API usage
// Implement delays between calls
// Queue requests when approaching limits
\`\`\`

## 5. Testing and Debugging Strategies

### Comprehensive Test Coverage
Create test data that covers all scenarios:

\`\`\`apex
// Test with:
// - Valid data
// - Invalid data
// - Edge cases
// - Large datasets
// - Error conditions
\`\`\`

### Debug Logging
Implement detailed logging for troubleshooting:

\`\`\`apex
// Use Assignment elements to log:
// - Process start/end times
// - Key decision points
// - Data transformations
// - Error conditions
\`\`\`

## 6. Security and Compliance

### Field-Level Security
Respect user permissions in your Flows:

\`\`\`apex
// Use $User global variables
// Check field accessibility before assignment
// Implement proper error handling for security violations
\`\`\`

### Audit Trail Implementation
Track all changes made by Flows:

\`\`\`apex
// Create audit records for:
// - Process initiation
// - Data changes
// - Error conditions
// - User actions
\`\`\`

## Best Practices Summary

1. **Always implement error handling** - Your Flows should gracefully handle failures
2. **Use Collections efficiently** - They're powerful but can impact performance
3. **Test with realistic data volumes** - Don't just test with small datasets
4. **Implement proper logging** - You'll need it for troubleshooting
5. **Consider security implications** - Respect user permissions and data access
6. **Plan for maintenance** - Document your Flows and keep them simple

## Conclusion

Advanced Flow patterns require careful planning and consideration of performance, security, 
and maintainability. By implementing these patterns, you can create robust, scalable automation 
solutions that can handle enterprise-level complexity while remaining maintainable and reliable.

Remember: The best Flow is one that's simple, well-documented, and thoroughly tested. Complexity 
should be justified by business value, not technical prowess.
    `
  },
  "scalable-apex-architecture-design-patterns": {
    title: "Building Scalable Apex Architecture: Design Patterns for Lightning Platform",
    date: "December 10, 2024",
    readTime: "12 min read",
    category: "Apex Development",
    content: `
# Building Scalable Apex Architecture: Design Patterns for Lightning Platform

As Salesforce applications grow in complexity, implementing proper design patterns becomes crucial for 
maintainability, testability, and scalability. This guide explores enterprise-grade patterns specifically 
tailored for the Lightning Platform.

## 1. Factory Pattern

The Factory pattern provides a way to create objects without specifying their exact class.

### Implementation Example

\`\`\`apex
public class AccountFactory {
    public static Account createAccount(String recordType) {
        switch on recordType {
            when 'Enterprise' {
                return new EnterpriseAccountBuilder().build();
            }
            when 'SMB' {
                return new SMBAccountBuilder().build();
            }
            when else {
                return new StandardAccountBuilder().build();
            }
        }
    }
}

public abstract class AccountBuilder {
    protected Account account;
    
    public AccountBuilder() {
        this.account = new Account();
    }
    
    public abstract Account build();
}

public class EnterpriseAccountBuilder extends AccountBuilder {
    public override Account build() {
        account.RecordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByDeveloperName()
            .get('Enterprise').getRecordTypeId();
        account.Type = 'Enterprise';
        // Set additional enterprise-specific fields
        return account;
    }
}
\`\`\`

## 2. Builder Pattern

The Builder pattern allows for step-by-step construction of complex objects.

### Implementation Example

\`\`\`apex
public class OpportunityBuilder {
    private Opportunity opportunity;
    
    public OpportunityBuilder() {
        this.opportunity = new Opportunity();
    }
    
    public OpportunityBuilder withAccount(Id accountId) {
        opportunity.AccountId = accountId;
        return this;
    }
    
    public OpportunityBuilder withAmount(Decimal amount) {
        opportunity.Amount = amount;
        return this;
    }
    
    public OpportunityBuilder withStage(String stage) {
        opportunity.StageName = stage;
        return this;
    }
    
    public OpportunityBuilder withCloseDate(Date closeDate) {
        opportunity.CloseDate = closeDate;
        return this;
    }
    
    public Opportunity build() {
        // Validation logic
        if (opportunity.AccountId == null) {
            throw new IllegalArgumentException('Account is required');
        }
        return opportunity;
    }
}

// Usage
Opportunity opp = new OpportunityBuilder()
    .withAccount(accountId)
    .withAmount(100000)
    .withStage('Prospecting')
    .withCloseDate(Date.today().addDays(30))
    .build();
\`\`\`

## 3. Strategy Pattern

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.

### Implementation Example

\`\`\`apex
public interface PricingStrategy {
    Decimal calculatePrice(Decimal basePrice, Map<String, Object> context);
}

public class StandardPricingStrategy implements PricingStrategy {
    public Decimal calculatePrice(Decimal basePrice, Map<String, Object> context) {
        return basePrice;
    }
}

public class VolumePricingStrategy implements PricingStrategy {
    public Decimal calculatePrice(Decimal basePrice, Map<String, Object> context) {
        Integer quantity = (Integer) context.get('quantity');
        if (quantity > 100) {
            return basePrice * 0.9; // 10% discount
        }
        return basePrice;
    }
}

public class PricingContext {
    private PricingStrategy strategy;
    
    public PricingContext(PricingStrategy strategy) {
        this.strategy = strategy;
    }
    
    public void setStrategy(PricingStrategy strategy) {
        this.strategy = strategy;
    }
    
    public Decimal executePricing(Decimal basePrice, Map<String, Object> context) {
        return strategy.calculatePrice(basePrice, context);
    }
}
\`\`\`

## 4. Repository Pattern

The Repository pattern abstracts data access logic and provides a uniform interface.

### Implementation Example

\`\`\`apex
public interface IAccountRepository {
    List<Account> findByIds(Set<Id> accountIds);
    List<Account> findByType(String type);
    Account save(Account account);
    void deleteById(Id accountId);
}

public class AccountRepository implements IAccountRepository {
    public List<Account> findByIds(Set<Id> accountIds) {
        return [
            SELECT Id, Name, Type, Industry, AnnualRevenue
            FROM Account
            WHERE Id IN :accountIds
        ];
    }
    
    public List<Account> findByType(String type) {
        return [
            SELECT Id, Name, Type, Industry, AnnualRevenue
            FROM Account
            WHERE Type = :type
        ];
    }
    
    public Account save(Account account) {
        upsert account;
        return account;
    }
    
    public void deleteById(Id accountId) {
        delete [SELECT Id FROM Account WHERE Id = :accountId];
    }
}
\`\`\`

## 5. Service Layer Pattern

The Service layer encapsulates business logic and provides a clean interface.

### Implementation Example

\`\`\`apex
public class AccountService {
    private IAccountRepository accountRepository;
    
    public AccountService(IAccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    
    public void processAccountUpgrade(Id accountId) {
        Account account = accountRepository.findByIds(new Set<Id>{accountId})[0];
        
        if (account.AnnualRevenue > 1000000) {
            account.Type = 'Enterprise';
            accountRepository.save(account);
            
            // Trigger related processes
            createEnterpriseOpportunities(account);
            notifyAccountTeam(account);
        }
    }
    
    private void createEnterpriseOpportunities(Account account) {
        // Business logic for creating opportunities
    }
    
    private void notifyAccountTeam(Account account) {
        // Business logic for notifications
    }
}
\`\`\`

## 6. Observer Pattern

The Observer pattern defines a one-to-many dependency between objects.

### Implementation Example

\`\`\`apex
public interface IObserver {
    void update(String eventType, Map<String, Object> eventData);
}

public class AccountEventManager {
    private Map<String, List<IObserver>> observers = new Map<String, List<IObserver>>();
    
    public void subscribe(String eventType, IObserver observer) {
        if (!observers.containsKey(eventType)) {
            observers.put(eventType, new List<IObserver>());
        }
        observers.get(eventType).add(observer);
    }
    
    public void notify(String eventType, Map<String, Object> eventData) {
        if (observers.containsKey(eventType)) {
            for (IObserver observer : observers.get(eventType)) {
                observer.update(eventType, eventData);
            }
        }
    }
}

public class AccountNotificationObserver implements IObserver {
    public void update(String eventType, Map<String, Object> eventData) {
        if (eventType == 'ACCOUNT_UPGRADED') {
            // Send notification logic
        }
    }
}
\`\`\`

## 7. Command Pattern

The Command pattern encapsulates a request as an object.

### Implementation Example

\`\`\`apex
public interface ICommand {
    void execute();
    void undo();
}

public class CreateOpportunityCommand implements ICommand {
    private Opportunity opportunity;
    private Id createdOpportunityId;
    
    public CreateOpportunityCommand(Opportunity opportunity) {
        this.opportunity = opportunity;
    }
    
    public void execute() {
        insert opportunity;
        createdOpportunityId = opportunity.Id;
    }
    
    public void undo() {
        if (createdOpportunityId != null) {
            delete [SELECT Id FROM Opportunity WHERE Id = :createdOpportunityId];
        }
    }
}

public class CommandInvoker {
    private List<ICommand> commands = new List<ICommand>();
    
    public void addCommand(ICommand command) {
        commands.add(command);
    }
    
    public void executeAll() {
        for (ICommand command : commands) {
            command.execute();
        }
    }
    
    public void undoAll() {
        for (Integer i = commands.size() - 1; i >= 0; i--) {
            commands[i].undo();
        }
    }
}
\`\`\`

## 8. Dependency Injection

Implement dependency injection for better testability and flexibility.

### Implementation Example

\`\`\`apex
public class ServiceContainer {
    private static Map<Type, Object> services = new Map<Type, Object>();
    
    public static void register(Type serviceType, Object implementation) {
        services.put(serviceType, implementation);
    }
    
    public static Object get(Type serviceType) {
        return services.get(serviceType);
    }
}

// Usage
ServiceContainer.register(IAccountRepository.class, new AccountRepository());
IAccountRepository accountRepo = (IAccountRepository) ServiceContainer.get(IAccountRepository.class);
\`\`\`

## Testing Patterns

### Mock Objects
Create mock implementations for testing:

\`\`\`apex
@isTest
public class MockAccountRepository implements IAccountRepository {
    private List<Account> accountsToReturn = new List<Account>();
    
    public void setAccountsToReturn(List<Account> accounts) {
        this.accountsToReturn = accounts;
    }
    
    public List<Account> findByIds(Set<Id> accountIds) {
        return accountsToReturn;
    }
    
    // Implement other interface methods...
}
\`\`\`

## Best Practices

1. **Single Responsibility Principle**: Each class should have one reason to change
2. **Open/Closed Principle**: Open for extension, closed for modification
3. **Dependency Inversion**: Depend on abstractions, not concretions
4. **Interface Segregation**: Clients shouldn't depend on interfaces they don't use
5. **Composition over Inheritance**: Favor composition for code reuse

## Conclusion

These design patterns provide a solid foundation for building maintainable, testable, and scalable Apex 
applications. Choose patterns that fit your specific use case and always prioritize code clarity and 
maintainability over cleverness.

Remember: The goal is not to use every pattern, but to use the right patterns for your specific requirements.
    `
  },
  "salesforce-zero-trust-security-architecture": {
    title: "Salesforce Security Deep Dive: Implementing Zero-Trust Architecture",
    date: "December 5, 2024",
    readTime: "10 min read",
    category: "Security & Compliance",
    content: `
# Salesforce Security Deep Dive: Implementing Zero-Trust Architecture

In today's threat landscape, traditional perimeter-based security models are insufficient. Zero-trust 
architecture assumes that no user or device should be trusted by default, even if they're inside the 
corporate network. This comprehensive guide shows how to implement zero-trust principles in Salesforce.

## 1. Zero-Trust Principles in Salesforce

### Never Trust, Always Verify
Every access request must be authenticated, authorized, and continuously validated.

### Least Privilege Access
Users should only have access to the minimum resources necessary for their role.

### Continuous Monitoring
All activities should be logged, monitored, and analyzed for anomalies.

## 2. Identity and Access Management

### Multi-Factor Authentication (MFA)
Implement MFA for all users, including administrators:

\`\`\`apex
// Custom MFA validation logic
public class MFAValidator {
    public static Boolean validateMFA(String userId, String token) {
        // Check if user has valid MFA token
        // Verify token hasn't expired
        // Log the authentication attempt
        return isValidToken(userId, token);
    }
}
\`\`\`

### Single Sign-On (SSO) Configuration
Configure SAML 2.0 or OAuth 2.0 for secure authentication:

\`\`\`xml
<!-- SAML Configuration Example -->
<saml:Assertion xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">
    <saml:Subject>
        <saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">
            user@company.com
        </saml:NameID>
    </saml:Subject>
    <saml:Conditions NotBefore="2024-01-01T00:00:00Z" NotOnOrAfter="2024-01-01T01:00:00Z">
        <saml:AudienceRestriction>
            <saml:Audience>https://company.my.salesforce.com</saml:Audience>
        </saml:AudienceRestriction>
    </saml:Conditions>
</saml:Assertion>
\`\`\`

## 3. Field-Level Security Implementation

### Dynamic Field Access Control
Implement runtime field access validation:

\`\`\`apex
public class FieldSecurityManager {
    public static Boolean hasFieldAccess(String objectName, String fieldName, String userId) {
        // Check field-level security
        // Verify user permissions
        // Consider data sensitivity
        return Schema.sObjectType.get(objectName)
            .fields.getMap().get(fieldName)
            .getDescribe().isAccessible();
    }
    
    public static void validateFieldAccess(String objectName, String fieldName, String userId) {
        if (!hasFieldAccess(objectName, fieldName, userId)) {
            throw new SecurityException('Insufficient field access permissions');
        }
    }
}
\`\`\`

### Sensitive Data Protection
Implement additional protection for sensitive fields:

\`\`\`apex
public class SensitiveDataHandler {
    public static String maskSensitiveData(String data, String fieldType) {
        switch on fieldType {
            when 'SSN' {
                return data.substring(0, 3) + '***-**-' + data.substring(9);
            }
            when 'CreditCard' {
                return '****-****-****-' + data.substring(data.length() - 4);
            }
            when 'Email' {
                String[] parts = data.split('@');
                return parts[0].substring(0, 2) + '***@' + parts[1];
            }
            when else {
                return data;
            }
        }
    }
}
\`\`\`

## 4. Data Encryption Strategies

### Encryption at Rest
Implement field-level encryption for sensitive data:

\`\`\`apex
public class DataEncryptionService {
    private static final String ENCRYPTION_KEY = 'your-encryption-key';
    
    public static String encrypt(String plainText) {
        // Implement AES-256 encryption
        // Use proper key management
        // Store encrypted data in encrypted fields
        return Crypto.encrypt('AES256', Blob.valueOf(ENCRYPTION_KEY), Blob.valueOf(plainText)).toString();
    }
    
    public static String decrypt(String encryptedText) {
        // Implement decryption
        // Handle decryption errors gracefully
        try {
            return Crypto.decrypt('AES256', Blob.valueOf(ENCRYPTION_KEY), Blob.valueOf(encryptedText)).toString();
        } catch (Exception e) {
            throw new SecurityException('Failed to decrypt data');
        }
    }
}
\`\`\`

### Encryption in Transit
Ensure all data transmission is encrypted:

\`\`\`apex
public class SecureDataTransmission {
    public static HttpResponse sendSecureData(String endpoint, Map<String, Object> data) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint(endpoint);
        req.setMethod('POST');
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Authorization', 'Bearer ' + getAccessToken());
        
        // Encrypt sensitive data before transmission
        String encryptedData = encryptSensitiveFields(data);
        req.setBody(encryptedData);
        
        Http http = new Http();
        return http.send(req);
    }
}
\`\`\`

## 5. Audit and Monitoring

### Comprehensive Audit Logging
Implement detailed audit trails:

\`\`\`apex
public class AuditLogger {
    public static void logDataAccess(String userId, String objectName, String recordId, String action) {
        Audit_Log__c auditLog = new Audit_Log__c(
            User_Id__c = userId,
            Object_Name__c = objectName,
            Record_Id__c = recordId,
            Action__c = action,
            Timestamp__c = System.now(),
            IP_Address__c = getClientIPAddress()
        );
        insert auditLog;
    }
    
    public static void logSecurityEvent(String eventType, String description, String severity) {
        Security_Event__c securityEvent = new Security_Event__c(
            Event_Type__c = eventType,
            Description__c = description,
            Severity__c = severity,
            Timestamp__c = System.now(),
            User_Id__c = UserInfo.getUserId()
        );
        insert securityEvent;
    }
}
\`\`\`

### Real-time Monitoring
Implement continuous monitoring for suspicious activities:

\`\`\`apex
public class SecurityMonitor {
    public static void checkSuspiciousActivity() {
        // Check for unusual login patterns
        // Monitor data access patterns
        // Detect potential security threats
        List<LoginHistory> recentLogins = [
            SELECT UserId, LoginTime, SourceIp, Status
            FROM LoginHistory
            WHERE LoginTime = TODAY
            ORDER BY LoginTime DESC
        ];
        
        analyzeLoginPatterns(recentLogins);
    }
    
    private static void analyzeLoginPatterns(List<LoginHistory> logins) {
        // Implement pattern analysis
        // Flag suspicious activities
        // Send alerts if necessary
    }
}
\`\`\`

## 6. Network Security

### IP Restrictions
Implement IP-based access controls:

\`\`\`apex
public class IPRestrictionManager {
    public static Boolean isAllowedIP(String userIP) {
        List<IP_Whitelist__c> allowedIPs = [
            SELECT IP_Address__c, Subnet_Mask__c
            FROM IP_Whitelist__c
            WHERE Is_Active__c = true
        ];
        
        for (IP_Whitelist__c allowedIP : allowedIPs) {
            if (isIPInRange(userIP, allowedIP.IP_Address__c, allowedIP.Subnet_Mask__c)) {
                return true;
            }
        }
        return false;
    }
}
\`\`\`

### Session Management
Implement secure session handling:

\`\`\`apex
public class SessionManager {
    public static void validateSession(String sessionId) {
        // Check session validity
        // Verify session hasn't expired
        // Check for session hijacking indicators
        if (!isValidSession(sessionId)) {
            throw new SecurityException('Invalid or expired session');
        }
    }
    
    public static void terminateSuspiciousSessions(String userId) {
        // Terminate all sessions for a user
        // Log the termination reason
        // Notify security team
    }
}
\`\`\`

## 7. Compliance and Governance

### Data Classification
Implement data classification and handling policies:

\`\`\`apex
public class DataClassificationManager {
    public enum DataClassification {
        PUBLIC,
        INTERNAL,
        CONFIDENTIAL,
        RESTRICTED
    }
    
    public static DataClassification getDataClassification(String objectName, String fieldName) {
        // Determine data classification based on field metadata
        // Apply appropriate security controls
        // Return classification level
    }
    
    public static Boolean canAccessData(DataClassification classification, String userRole) {
        // Check if user role can access data of this classification
        // Implement role-based access control
    }
}
\`\`\`

### Compliance Reporting
Generate compliance reports:

\`\`\`apex
public class ComplianceReporter {
    public static void generateSOXReport() {
        // Generate SOX compliance report
        // Include access controls, audit trails
        // Export to secure location
    }
    
    public static void generateGDPRReport() {
        // Generate GDPR compliance report
        // Include data processing activities
        // Include data subject rights
    }
}
\`\`\`

## 8. Incident Response

### Automated Threat Detection
Implement automated threat detection and response:

\`\`\`apex
public class ThreatDetectionService {
    public static void detectThreats() {
        // Monitor for suspicious patterns
        // Detect potential security breaches
        // Trigger automated responses
    }
    
    public static void respondToThreat(String threatType, String severity) {
        // Implement automated response procedures
        // Notify security team
        // Take protective actions
    }
}
\`\`\`

## 9. Security Testing

### Automated Security Testing
Implement security testing in your CI/CD pipeline:

\`\`\`apex
@isTest
public class SecurityTestSuite {
    @isTest
    static void testFieldLevelSecurity() {
        // Test field access controls
        // Verify proper permissions
        // Test edge cases
    }
    
    @isTest
    static void testDataEncryption() {
        // Test encryption/decryption
        // Verify data integrity
        // Test key management
    }
}
\`\`\`

## 10. Best Practices Summary

1. **Implement Defense in Depth**: Multiple layers of security controls
2. **Regular Security Audits**: Continuous assessment of security posture
3. **User Education**: Regular security awareness training
4. **Incident Response Plan**: Clear procedures for security incidents
5. **Regular Updates**: Keep security configurations current
6. **Monitor and Alert**: Continuous monitoring with appropriate alerts

## Conclusion

Implementing zero-trust architecture in Salesforce requires a comprehensive approach covering 
identity management, data protection, network security, and continuous monitoring. By following 
these principles and implementing the suggested patterns, you can significantly enhance your 
organization's security posture.

Remember: Security is not a one-time implementation but an ongoing process that requires constant 
vigilance and adaptation to emerging threats.
    `
  },
  "generic-file-management-app-salesforce-aws-s3": {
    title: "Generic File Management App: Seamless Salesforce Integration with AWS S3",
    date: "February 27, 2026",
    readTime: "10 min read",
    category: "Integration",
    excerpt: "Easily manage files in Salesforce with AWS S3: upload, preview, and delete files on any object record. Cut storage costs and scale with S3 security and cost-efficiency while keeping seamless access in your CRM.",
    content: `
# Generic File Management App for Salesforce: Scale with AWS S3

Easily manage files in Salesforce with the power of **AWS S3**. Our **Generic File Management App** works on **any object record**: upload, preview, and delete files directly from Salesforce while using S3's scalability, security, and cost-efficiency. Store large volumes outside Salesforce to save storage costs and keep seamless access inside your CRM.

[IMAGE:salesforce-s3-hero.png:Salesforce record page with file management component]

## Why move file storage to AWS S3?

Salesforce storage is expensive and fills up fast when you have lots of attachments and documents. Offloading files to **AWS S3** gives you:

- **Lower Salesforce storage costs** – pay only for what you use in S3.
- **Virtually unlimited capacity** – no more storage-full alerts.
- **Strong security and lifecycle rules** – IAM, encryption, and retention in one place.

## How it works

The solution is a **Lightning Web Component (LWC)** you can add to any record page:

1. The user selects files to upload.
2. An Apex controller returns a **pre-signed S3 URL**.
3. Files are sent **directly from the browser to S3**, so Salesforce size limits do not apply.
4. File metadata (name, URL, size, record link) is stored in a custom object for listing and preview.

The same component lists files for the record, shows **in-app previews** (images, PDFs, etc.), and supports **secure delete** so the file is removed from both S3 and Salesforce metadata.

[IMAGE:file-upload-flow.png:Flow diagram: user uploads from Salesforce to S3 via pre-signed URL]

## Key features

- **Direct upload to AWS S3** – files go from the UI to S3 using pre-signed URLs; no heavy lifting in Salesforce.
- **In-app preview** – view images, documents, and other supported types without leaving the record.
- **Secure delete** – one action removes the file from S3 and the metadata record in Salesforce.
- **Works on any object** – use the same component on Account, Opportunity, Custom Object, or any record page.
- **Cost optimization** – keep Salesforce storage for CRM data; use S3 for large or high-volume files.

[VIDEO:generic-file-manager-demo.mp4]

## Benefits for your business
- **Scalability** – handle large volumes of media and documents without hitting Salesforce limits.
- **Security** – use AWS IAM and S3 encryption to protect sensitive files.
- **Performance** – move big uploads and downloads off Salesforce and onto S3.
- **Native Salesforce integration** – everything stays in the CRM UI; users do not switch systems.

## Getting started

1. Deploy the LWC and Apex (or install the managed package).
2. Configure an **AWS S3 bucket** and IAM permissions (including pre-signed URL generation).
3. Add the component to the right record pages in **Lightning App Builder**.
4. Optionally add custom logic (e.g. virus scanning, tagging, or approval).

> **Ready to implement?** Contact CRMFinex for a free consultation and setup help. We can help you cut storage costs and streamline file handling in Salesforce.

`,
  }
};

export async function generateStaticParams() {
  const slugs = Object.keys(blogPosts);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  if (!post) return { title: "Post Not Found" };
  const description = "excerpt" in post ? (post as { excerpt?: string }).excerpt : post.title;
  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `${baseUrl}/blog/${slug}`,
      publishedTime: post.date,
    },
    twitter: { card: "summary_large_image", title: post.title, description },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // 3. Await the params before using the slug
  const resolvedParams = await params;
  const post = blogPosts[resolvedParams.slug as keyof typeof blogPosts];
  
  if (!post) {
    return (
      <div>
        <Navbar />
        <main className="container-max py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-white/70 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="btn-primary rounded-full px-6 py-3">
            Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    description: "excerpt" in post ? (post as { excerpt?: string }).excerpt : post.title,
    url: `${baseUrl}/blog/${resolvedParams.slug}`,
    author: { "@type": "Organization", name: "CRMFinex" },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main className="container-max py-16">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white">
                {post.category}
              </span>
              <span className="text-sm text-white/60">{post.readTime}</span>
              <time dateTime={post.date} className="text-sm text-white/60">{post.date}</time>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
          </header>

          <div className="glass rounded-2xl p-8 md:px-10 max-w-none">
            <BlogContent content={post.content} />
          </div>

          <footer className="mt-12 text-center">
            <Link href="/blog" className="btn-primary rounded-full px-6 py-3 inline-block">
              ← Back to Blog
            </Link>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
