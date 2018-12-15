package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.exception.ResourceNotFoundException;
import del.be_inv_mgt.model.Supervisor;
import del.be_inv_mgt.model.respon.ErrorCode;
import del.be_inv_mgt.repository.SupervisorRepository;
import del.be_inv_mgt.service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupervisorServiceImpl implements SupervisorService {
    @Autowired
    private SupervisorRepository supervisorRepository;

    public List<Supervisor> getAllSupervisor(){
        List<Supervisor> supervisors = supervisorRepository.findAll();

        if(supervisors.isEmpty()){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return supervisors;
    }

    public Supervisor getSupervisorById(String supervisorID){
        Supervisor supervisor = supervisorRepository.findBySupervisorID(supervisorID);

        if(supervisor == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return supervisor;
    }

    public Supervisor getSupervisorByName(String name){
        Supervisor supervisor = supervisorRepository.findByName(name);

        if(supervisor == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return supervisor;
    }

    public Supervisor createSupervisor(Supervisor supervisorNew){
        Supervisor supervisor = supervisorRepository.findByEmail(supervisorNew.getEmail());

        if(supervisor != null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return supervisorRepository.save(supervisor);
    }

    public Supervisor updateSupervisorById(String supervisorID, Supervisor supervisorUpd) {
        Supervisor supervisor = supervisorRepository.findBySupervisorID(supervisorID);

        if(supervisor == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }else{
            supervisor.setUserID(supervisorID);
            supervisor.setPassword(supervisor.getPassword());

            supervisor.setName(supervisorUpd.getName());
            supervisor.setEmail(supervisorUpd.getEmail());
            supervisor.setGender(supervisorUpd.getGender());
            supervisor.setAddress(supervisorUpd.getAddress());

            supervisorRepository.save(supervisor);
        }

        return supervisor;
    }

    public boolean deleteSupervisorById(String supervisorID) {
        Supervisor supervisor = supervisorRepository.findBySupervisorID(supervisorID);

        if(supervisor == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }
        else{
            supervisorRepository.deleteById(supervisorID);
        }
        return true;
    }
}
