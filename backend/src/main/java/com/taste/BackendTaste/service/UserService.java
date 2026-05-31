// package com.taste.BackendTaste.service;

// import com.taste.BackendTaste.io.UserRequest;
// import com.taste.BackendTaste.io.UserResponse;

// public interface UserService {
  

//       UserResponse registerUser(UserRequest request);
//       String findByUserId();
      

// }


package com.taste.BackendTaste.service;

import com.taste.BackendTaste.io.UserRequest;
import com.taste.BackendTaste.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    // this is needed by AddressController + OrderController
    String getCurrentUserId();
}
