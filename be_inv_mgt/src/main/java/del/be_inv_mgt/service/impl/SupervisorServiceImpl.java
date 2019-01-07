package del.be_inv_mgt.service.impl;

import del.be_inv_mgt.exception.ResourceNotFoundException;
import del.be_inv_mgt.model.Supervisor;
import del.be_inv_mgt.model.respon.ErrorCode;
import del.be_inv_mgt.repository.SupervisorRepository;
import del.be_inv_mgt.service.SupervisorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    public List<Supervisor> getAllSupervisorByName(String name){
        if(!supervisorRepository.existsByNameContaining(name)){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return supervisorRepository.findAllByNameContaining(name);
    }

    public Supervisor createSupervisor(Supervisor supervisorNew){
        Supervisor supervisor = supervisorRepository.findByEmail(supervisorNew.getEmail());

        if(supervisor != null){
            throw new ResourceNotFoundException(ErrorCode.BAD_REQUEST.getCode(), ErrorCode.BAD_REQUEST.getMessage());
        }

        supervisorNew.setSupervisorID("sup_"+getDate());

        return supervisorRepository.save(supervisorNew);
    }

    public Supervisor updateSupervisorById(String supervisorID, Supervisor supervisorUpd) {
        Supervisor supervisor = supervisorRepository.findBySupervisorID(supervisorID);

        if(supervisor == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }else{
            supervisor.setName(supervisorUpd.getName());
            supervisor.setEmail(supervisorUpd.getEmail());
            supervisor.setPassword(supervisorUpd.getPassword());

            supervisorRepository.save(supervisor);
        }

        return supervisor;
    }

    public boolean deleteSupervisorById(String supervisorID) {
        Supervisor supervisor = supervisorRepository.findBySupervisorID(supervisorID);

        if(supervisor == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        supervisorRepository.deleteBySupervisorID(supervisorID);

        return true;

    }

    public Supervisor login(Supervisor supervisorlogin){
        Supervisor supervisor = supervisorRepository.findByEmail(supervisorlogin.getEmail());

        if(supervisor == null){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        if(!supervisor.getPassword().equals(supervisorlogin.getPassword())){
            throw new ResourceNotFoundException(ErrorCode.NOT_FOUND.getCode(), ErrorCode.NOT_FOUND.getMessage());
        }

        return supervisor;
    }

    static String getDate(){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        LocalDateTime now = LocalDateTime.now();

        String dateTimeNow = dtf.format(now);

        return dateTimeNow;
    }
}
