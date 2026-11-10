package in.sp.main.Controllers;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;

import in.sp.main.dto.PurchasedCourse;
import in.sp.main.entities.Orders;
import in.sp.main.services.OrdersService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class OrdersController {
	
	@Value("${razorpay.key.id}")
	private String razorpayKeyId;

	@Value("${razorpay.key.secret}")
	private String razorpayKeySecret;
	    
	@Autowired
	private OrdersService ordersService;
	
	@PostMapping("/storeOrderDetails")
	public ResponseEntity<String> storeUserOrders(@RequestBody Orders orders) throws RazorpayException {
		
		RazorpayClient razorpayClient = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount",orders.getCourseAmount()); // Amount is in currency subunits. 
		orderRequest.put("currency","INR");
		orderRequest.put("receipt", "rcpt_id_"+System.currentTimeMillis());

		Order order = razorpayClient.orders.create(orderRequest);
		
		String orderId = order.get("id");
		orders.setOrderId(orderId);
		
		ordersService.storeUserOrdersService(orders);
		
		return ResponseEntity.ok(
		            "Order details stored successfully"
		      );
		
	 }
	
		
	@GetMapping("/getPurchasedCourses")
	 public List<PurchasedCourse> findPurchasedCoursesByEmail(@RequestParam String email){
		
		 List<Object[]> pcDbList = ordersService.findPurchasedCoursesByEmailService(email);
		 
		 List<PurchasedCourse> purchasedCoursesList = new ArrayList<>();
		 
		 for(Object[] course: pcDbList) {
			 
			 PurchasedCourse purchasedCourse = new PurchasedCourse();
			 
			 purchasedCourse.setPurchaseDate((String)course[0]);
			 purchasedCourse.setDescription((String)course[1]);
			 purchasedCourse.setCourseName((String)course[2]);
			 purchasedCourse.setImageUrl((String)course[3]);
			 purchasedCourse.setUpdatedOn((String)course[4]);
			 
			 purchasedCoursesList.add(purchasedCourse);
		 }
		 
		 return purchasedCoursesList;
	 }
}
