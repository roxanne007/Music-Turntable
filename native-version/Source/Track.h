/*
  ==============================================================================

    Track.h
    Created: 1 Aug 2021 11:41:10pm
    Author:  roxy

  ==============================================================================
*/

#pragma once
#include <JuceHeader.h>

class Track
{
    public:
        Track(juce::File _file);
        juce::File file;
        juce::URL URL;
        juce::String title;
        juce::String length;
        /**objects are compared by title*/
        bool operator==(const juce::String& other) const;
};