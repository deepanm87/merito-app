-- This file contains sample data for testing the application

-- Insert sample user with the specific email
INSERT INTO users (
    id,
    email,
    subscription_status,
    subscription_price_id,
    subscription_start_date,
    created_at,
    updated_at
) VALUES (
    'user_30hbBLj9RdYa7WtSyb4qp3SKOL6',
    'kulkarni.ankita09@gmail.com',
    'active',
    'price_123456789',
    '2024-01-15 10:00:00',
    '2024-01-15 10:00:00',
    '2024-01-15 10:00:00'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample forms
INSERT INTO forms (
    id,
    user_id,
    name,
    description,
    thank_you_message,
    form_type,
    created_at,
    updated_at
) VALUES 
(
    'form_testimonial_4',
    'user_30hbBLj9RdYa7WtSyb4qp3SKOL6',
    'Product Feedback Form Duplicates',
    'Help us improve our product by sharing your experience',
    'Thank you for your valuable feedback! We appreciate your time.',
    'testimonial',
    '2024-01-15 11:00:00',
    '2024-01-15 11:00:00'
),
(
    'form_testimonial_5',
    'user_30hbBLj9RdYa7WtSyb4qp3SKOL6',
    'ProofyBubble Feedback Form Duplicates',
    'We value your opinion about our service quality',
    'Thanks for taking the time to share your thoughts with us!',
    'testimonial',
    '2024-01-16 09:00:00',
    '2024-01-16 09:00:00'
),
(
    'form_testimonial_6',
    'user_30hbBLj9RdYa7WtSyb4qp3SKOL6',
    'Frontend Snacks Feedback Form Duplicates',
    'Tell us about your experience using our website',
    'Your feedback helps us create a better experience for everyone!',
    'testimonial',
    '2024-01-17 14:00:00',
    '2024-01-17 14:00:00'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample testimonials
INSERT INTO testimonials (
    form_id,
    name,
    role,
    testimonial,
    rating,
    status,
    created_at,
    updated_at
) VALUES 
-- Approved testimonials
(
    'form_testimonial_1',
    'Sarah Johnson',
    'Marketing Manager',
    'This product has completely transformed how we handle customer feedback. The interface is intuitive and the analytics are incredibly insightful. Highly recommend!',
    5,
    'approved',
    '2024-01-15 12:00:00',
    '2024-01-15 12:00:00'
),
(
    'form_testimonial_1',
    'Michael Chen',
    'Product Manager',
    'Excellent tool for collecting testimonials. The embed feature works seamlessly and the dashboard provides great insights. Customer support is also top-notch.',
    5,
    'approved',
    '2024-01-15 13:00:00',
    '2024-01-15 13:00:00'
),
(
    'form_testimonial_2',
    'Emily Rodriguez',
    'Customer Success Lead',
    'We''ve seen a significant improvement in our customer feedback collection since using this platform. The forms are easy to customize and the results are actionable.',
    4,
    'approved',
    '2024-01-16 10:00:00',
    '2024-01-16 10:00:00'
),
(
    'form_testimonial_2',
    'David Kim',
    'Startup Founder',
    'Perfect for our small team. Affordable, easy to use, and gets the job done. The testimonial approval workflow is exactly what we needed.',
    5,
    'approved',
    '2024-01-16 11:00:00',
    '2024-01-16 11:00:00'
),
(
    'form_testimonial_3',
    'Lisa Thompson',
    'UX Designer',
    'The user experience is fantastic. Clean interface, fast loading times, and the mobile responsiveness is excellent. Great job on the design!',
    5,
    'approved',
    '2024-01-17 15:00:00',
    '2024-01-17 15:00:00'
),
-- Pending testimonials
(
    'form_testimonial_1',
    'Alex Turner',
    'Business Analyst',
    'Good platform overall. The features are useful and the pricing is reasonable. Would like to see more customization options in the future.',
    4,
    'pending',
    '2024-01-15 14:00:00',
    '2024-01-15 14:00:00'
),
(
    'form_testimonial_2',
    'Rachel Green',
    'Operations Manager',
    'Solid tool for feedback collection. The dashboard is helpful for tracking responses. Integration with our existing workflow was straightforward.',
    4,
    'pending',
    '2024-01-16 12:00:00',
    '2024-01-16 12:00:00'
),
(
    'form_testimonial_3',
    'James Wilson',
    'Digital Marketing Specialist',
    'Great for collecting testimonials from our clients. The embed feature is particularly useful. Looking forward to more features in future updates.',
    4,
    'pending',
    '2024-01-17 16:00:00',
    '2024-01-17 16:00:00'
),
-- Rejected testimonials
(
    'form_testimonial_1',
    'Anonymous User',
    'Customer',
    'Not satisfied with the service. Too expensive for what it offers.',
    2,
    'rejected',
    '2024-01-15 15:00:00',
    '2024-01-15 15:00:00'
),
(
    'form_testimonial_2',
    'Test User',
    'Tester',
    'This is just a test review for demonstration purposes.',
    3,
    'rejected',
    '2024-01-16 13:00:00',
    '2024-01-16 13:00:00'
) ON CONFLICT DO NOTHING;

-- Add some additional test users (inactive subscriptions for testing)
INSERT INTO users (
    id,
    email,
    subscription_status,
    subscription_price_id,
    subscription_start_date,
    created_at,
    updated_at
) VALUES 
(
    'user_test_1',
    'test1@example.com',
    'inactive',
    NULL,
    '2024-01-10 10:00:00',
    '2024-01-10 10:00:00',
    '2024-01-10 10:00:00'
),
(
    'user_test_2',
    'test2@example.com',
    'canceled',
    'price_old_123',
    '2024-01-05 10:00:00',
    '2024-01-05 10:00:00',
    '2024-01-05 10:00:00'
) ON CONFLICT (id) DO NOTHING; 