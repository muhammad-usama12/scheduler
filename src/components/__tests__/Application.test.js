import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText, act, getAllByText } from "@testing-library/react";
import axios from "axios";
import Application from "components/Application";

afterEach(cleanup);

  describe("Application", () => {

    it("changes the schedule when a new day is selected", async () => {
      const { getByText } = render(<Application />)
  
      await waitForElement(() => getByText("Monday"));
  
      fireEvent.click(getByText("Tuesday"));
  
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    })

    it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
      const { container} = render(<Application />);

      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
      fireEvent.click(getByAltText(appointment, "Add"));
      fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
      fireEvent.click(getByText(appointment, "Save"));
      expect(getByText(appointment, "SAVING")).toBeInTheDocument();

      await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));
  
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
  
      expect(getByText(container, "no spots remaining")).toBeInTheDocument();
    })

    it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

      const { container } = render(<Application />);

      await waitForElement(() => getByText(container, "Archie Cohen"));
    

      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Delete"));
    

      expect(
        getByText(appointment, "Are you sure you would like to delete?")
      ).toBeInTheDocument();
    

      fireEvent.click(queryByText(appointment, "Confirm"));
    

      act(() => expect(getByText(container, "DELETING")).toBeInTheDocument());
    

      await waitForElement(() => getByAltText(appointment, "Add"));
    

      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
    
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    });

    it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {


      const { container } = render(<Application />);
  

      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      // 3. Click edit
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Edit"));
  

      expect(getByText(appointment, "Cancel")).toBeInTheDocument();
  
      // 5. click save
      fireEvent.click(queryByText(appointment, "Cancel"));
  

      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      // 7. check spots
      const day = getAllByTestId(container, "day").find(day =>
        queryByText(day, "Monday")
      );
      expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    })
  
    it("shows the save error when failing to save an existing appointment", async () => {
      
      axios.put.mockRejectedValueOnce()
      
      // 1. Render app
      const { container } = render(<Application />);
  
      // 2. Wait until archie
      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      // 3. Click edit
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Save"));
  
      // 4. check mode change
      expect(getByText(appointment, "Cancel")).toBeInTheDocument();
  
      // 5. click save
      fireEvent.click(queryByText(appointment, "Confirm"));
  
      // 6. wait for Error to appear
      await waitForElement(() => getByText(appointment, "Error"));
  
      // 7. check spots
      
      expect(getByText(appointment, 'There was an error while saving')).toBeInTheDocument();
    })
  
    it("shows the delete error when failing to delete an existing appointment", async () => {
      
      axios.delete.mockRejectedValueOnce()
      
      // 1. Render app
      const { container } = render(<Application />);
  
      // 2. Wait until archie
      await waitForElement(() => getByText(container, "Archie Cohen"));
  
      // 3. Click edit
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
    
      fireEvent.click(queryByAltText(appointment, "Delete"));
  
      // 4. check mode change
      expect(getByText(appointment, "Cancel")).toBeInTheDocument();
  
      // 5. click save
      fireEvent.click(queryByText(appointment, "Confirm"));
  
      // 6. wait for Error to appear
      await waitForElement(() => getByText(appointment, "Error"));
  
      // 7. check spots
      
      expect(getByText(appointment, 'There was an error while deleting')).toBeInTheDocument();
    })
  
  })
