package del.be_inv_mgt.service;

import del.be_inv_mgt.model.Supervisor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SupervisorService {
    List<Supervisor> getAllSupervisor();

    Supervisor getSupervisorById(String supervisorID);

    Supervisor createSupervisor(Supervisor supervisorID);

    Supervisor updateSupervisorById(String supervisorID, Supervisor supervisor);

    boolean deleteSupervisorById(String supervisorID);
}
