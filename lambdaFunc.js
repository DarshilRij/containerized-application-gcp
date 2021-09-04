'use strict';

exports.handler = async (event) => {
    let { name, slots } = event.currentIntent
    if (slots.typeofpizza !== null && slots.quantity !== null && slots.deliveryType === "delivery" && slots.address === null) {
        return {
            dialogAction: {
                type: "ElicitSlot",
                intentName: name,
                slotToElicit: "address",
                slots
            }
        }
    }
    if (slots.typeofpizza !== null && slots.quantity !== null && slots.deliveryType === "pickup" && slots.time === null) {
        return {
            dialogAction: {
                type: "ElicitSlot",
                intentName: name,
                slotToElicit: "time",
                slots
            }
        }
    }
    if (slots.typeofpizza !== null && slots.quantity !== null && slots.deliveryType === "pickup" && slots.date === null) {
        return {
            dialogAction: {
                type: "ElicitSlot",
                intentName: name,
                slotToElicit: "date",
                slots
            }
        }
    }
    return {
        dialogAction: {
            type: "Delegate",
            slots
        }
    }
};