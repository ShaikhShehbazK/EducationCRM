package in.sp.main.services;

import java.util.List;

import in.sp.main.entities.Orders;

public interface OrdersService{
	public void storeUserOrdersService(Orders orders);

	 List<Object[]> findPurchasedCoursesByEmailService(String email);
}
