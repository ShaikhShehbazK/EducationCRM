package in.sp.main.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import in.sp.main.entities.Orders;
import in.sp.main.repositories.OrdersRepository;

@Service
public class OrdersServiceImpl implements OrdersService{
	
	@Autowired
	private OrdersRepository orderRepository;
	
	@Override
	public void storeUserOrdersService(Orders orders) {
		// TODO Auto-generated method stub
		orderRepository.save(orders);
	}

	@Override
	public List<Object[]> findPurchasedCoursesByEmailService(String email) {
		// TODO Auto-generated method stub
		return orderRepository.findPurchasedCoursesByEmail(email);
	}

}
