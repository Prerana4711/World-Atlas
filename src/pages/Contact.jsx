import React, { useState ,useEffect} from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    message: ''
  });

  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: '' // 'success' or 'error'
  });
  
  const [savedData, setSavedData] = useState(null);
  const [allEmails, setAllEmails] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode

  // Load saved data when component mounts
  useEffect(() => {
    const data = localStorage.getItem('contactForm');
    if (data) {
      setSavedData(JSON.parse(data));
    }
    
    // Load all saved emails for duplicate check
    const savedMessages = localStorage.getItem('allMessages');
    if (savedMessages) {
      const messages = JSON.parse(savedMessages);
      const emails = messages.map(msg => msg.email);
      setAllEmails(emails);
    }
  }, []);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return 'Name is required';
    }
    if (name.trim().length < 3) {
      return 'Name must be at least 3 characters';
    }
    if (name.trim().length > 50) {
      return 'Name must be less than 50 characters';
    }
    return '';
  };

  const validateEmail = (email, checkDuplicate = true) => {
    if (!email.trim()) {
      return 'Email is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    
    // Check for duplicate email (skip if editing and email hasn't changed)
    if (checkDuplicate && email.trim() && allEmails.includes(email)) {
      // If we're editing and the email is the same as the saved data's email, don't show duplicate error
      if (isEditing && savedData && email === savedData.email) {
        return '';
      }
      return 'Email already exists';
    }
    
    return '';
  };

  const validateMessage = (message) => {
    if (!message.trim()) {
      return 'Message is required';
    }
    if (message.trim().length < 10) {
      return 'Message must be at least 10 characters';
    }
    if (message.trim().length > 500) {
      return 'Message must be less than 500 characters';
    }
    return '';
  };

  // Show toast message
  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Validate all fields and update errors
  const validateAllFields = () => {
    const nameError = validateName(formData.username);
    const emailError = validateEmail(formData.email, true);
    const messageError = validateMessage(formData.message);
    
    setErrors({
      username: nameError,
      email: emailError,
      message: messageError
    });
    
    return !nameError && !emailError && !messageError;
  };

  // Handle input change with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation - show errors immediately
    let error = '';
    switch(name) {
      case 'username':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value, true);
        break;
      case 'message':
        error = validateMessage(value);
        break;
      default:
        break;
    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const isValid = validateAllFields();

    // If form is valid, submit
    if (isValid) {
      if (isEditing) {
        // Update existing data
        handleUpdateData();
      } else {
        // Save new data
        handleSaveNewData();
      }
    } else {
      showToast('Please fix the errors before submitting.', 'error');
    }
  };

  const handleSaveNewData = () => {
    // Save current form data
    localStorage.setItem('contactForm', JSON.stringify(formData));
    
    // Save to all messages array for email tracking
    const savedMessages = localStorage.getItem('allMessages');
    const messages = savedMessages ? JSON.parse(savedMessages) : [];
    const newMessage = { ...formData, timestamp: new Date().toISOString() };
    const updatedMessages = [...messages, newMessage];
    localStorage.setItem('allMessages', JSON.stringify(updatedMessages));
    
    // Update emails list
    const emails = updatedMessages.map(msg => msg.email);
    setAllEmails(emails);
    
    setSavedData(formData);
    
    showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
    
    // Reset form
    setFormData({ username: '', email: '', message: '' });
    setErrors({ username: '', email: '', message: '' });
    setIsEditing(false);
  };

  const handleUpdateData = () => {
    // Update in localStorage
    localStorage.setItem('contactForm', JSON.stringify(formData));
    
    // Update in allMessages array
    const savedMessages = localStorage.getItem('allMessages');
    if (savedMessages) {
      const messages = JSON.parse(savedMessages);
      
      // Find and update the message that matches the old saved data
      const updatedMessages = messages.map(msg => {
        // If this message matches the old saved data, update it with new data
        if (msg.email === savedData?.email && 
            msg.username === savedData?.username && 
            msg.message === savedData?.message) {
          return { 
            ...formData, 
            timestamp: new Date().toISOString(),
            updatedAt: new Date().toISOString() 
          };
        }
        return msg;
      });
      
      localStorage.setItem('allMessages', JSON.stringify(updatedMessages));
      
      // Update emails list
      const emails = updatedMessages.map(msg => msg.email);
      setAllEmails(emails);
    }
    
    // Update saved data in state
    setSavedData(formData);
    
    showToast('Message updated successfully!', 'success');
    
    // Reset form and edit mode
    setFormData({ username: '', email: '', message: '' });
    setErrors({ username: '', email: '', message: '' });
    setIsEditing(false);
  };

  // Handle delete saved data
  const handleDeleteData = () => {
    // Remove from localStorage
    localStorage.removeItem('contactForm');
    
    // Also remove from allMessages array
    const savedMessages = localStorage.getItem('allMessages');
    if (savedMessages) {
      const messages = JSON.parse(savedMessages);
      // Filter out the message that matches the saved data
      const updatedMessages = messages.filter(msg => 
        msg.email !== savedData?.email || 
        msg.username !== savedData?.username || 
        msg.message !== savedData?.message
      );
      localStorage.setItem('allMessages', JSON.stringify(updatedMessages));
      
      // Update emails list
      const emails = updatedMessages.map(msg => msg.email);
      setAllEmails(emails);
    }
    
    // Clear saved data from state
    setSavedData(null);
    
    // Reset form and edit mode if active
    if (isEditing) {
      setFormData({ username: '', email: '', message: '' });
      setIsEditing(false);
    }
    
    // Show success toast
    showToast('Data deleted successfully!', 'success');
  };

  // Handle edit button click
  const handleEditData = () => {
    if (savedData) {
      // Pre-fill the form with saved data
      setFormData({
        username: savedData.username,
        email: savedData.email,
        message: savedData.message
      });
      
      // Set edit mode to true
      setIsEditing(true);
      
      // Clear any existing errors
      setErrors({ username: '', email: '', message: '' });
      
      // Scroll to form
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      showToast('You can now edit your message', 'info');
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setFormData({ username: '', email: '', message: '' });
    setErrors({ username: '', email: '', message: '' });
    setIsEditing(false);
    showToast('Edit cancelled', 'info');
  };

  return (
    <section className='section-contact'>
      <h2 className='container-title'>Contact Us</h2>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.message}
        </div>
      )}

      <div className='contact-wrapper container'>
        <form onSubmit={handleFormSubmit} noValidate>
          
          <div className='form-group'>
            <input 
              type='text'
              placeholder='Enter your name'
              name='username'
              value={formData.username}
              onChange={handleInputChange}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && (
              <span className='error-message'>{errors.username}</span>
            )}
          </div>

          <div className='form-group'>
            <input 
              type='text'
              placeholder='Enter your email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className='error-message'>{errors.email}</span>
            )}
          </div>

          <div className='form-group'>
            <textarea 
              placeholder='Enter your message'
              name='message'
              rows={6}
              value={formData.message}
              onChange={handleInputChange}
              className={errors.message ? 'error' : ''}
            ></textarea>
            {errors.message && (
              <span className='error-message'>{errors.message}</span>
            )}
            
            {/* Character counter */}
            <div className='char-counter'>
              {formData.message.length}/500 characters
            </div>
          </div>

          <div className='form-actions'>
            <button type='submit' className={isEditing ? 'update-btn' : ''}>
              {isEditing ? 'Update Message' : 'Send Message'}
            </button>
            
            {isEditing && (
              <button 
                type='button' 
                onClick={handleCancelEdit}
                className='cancel-btn'
              >
                 Cancel
              </button>
            )}
          </div>

        </form>
      </div>
      
      {savedData && (
        <div className='saved-data'>
          <div className='saved-data-header'>
            <h3>Last Saved Data:</h3>
            <div className='action-buttons'>
              <button 
                onClick={handleEditData}
                className='edit-btn'
                title='Edit saved data'
                disabled={isEditing}
              >
                ✏️ 
              </button>
              <button 
                onClick={handleDeleteData}
                className='delete-btn'
                title='Delete saved data'
                disabled={isEditing}
              >
                🗑️ 
              </button>
            </div>
          </div>
          <p><strong>Name:</strong> {savedData.username}</p>
          <p><strong>Email:</strong> {savedData.email}</p>
          <p><strong>Message:</strong> {savedData.message}</p>
        </div>
      )}
    </section>
  )
}

export default Contact